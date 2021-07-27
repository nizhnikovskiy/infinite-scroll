import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Subject } from "rxjs";

import { Trip, TableDataSource, RowData } from "./helpers/data-source.helper";
import { TableDataSourceService } from "../../../services/table-data-source/table-data-source.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-virtual-scroll-table',
  templateUrl: './virtual-scroll-table.component.html',
  styleUrls: ['./virtual-scroll-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VirtualScrollTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tableWrapperRef') tableRef: ElementRef<HTMLDivElement> | undefined;
  private scrollLocation: number = this.tableDataService.scrollLocation;
  expandedElement: RowData = this.tableDataService.expandedElement;
  selection = this.tableDataService.selection;
  isLoading = false;

  columnsToDisplay = ['select' , 'description', 'startDate', 'endDate', 'createdOn', 'status', 'actions'];
  dataSource: any;

  private subscriber = new Subject();

  constructor(
    private tableDataService: TableDataSourceService
  ) { }

  onTableScroll(event: any) {
    if (event.target) {
      const tableViewHeight = event.target.offsetHeight;
      const scrollLocation = event.target.scrollTop;
      const buffer = tableViewHeight / 2;
      const itemSize = 58;
      let index = Math.floor((scrollLocation + buffer) / (itemSize * this.tableDataService.partSize));
      index = index < 4 ? 0 : index - 3;
      this.dataSource.loadData(index);
      this.scrollLocation = scrollLocation;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.virtualArray.getValue().length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.virtualArray.getValue());
  }

  checkboxLabel(row?: Trip): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  ngOnInit(): void {
    this.dataSource = new TableDataSource(this.tableDataService, this.tableDataService.virtualArray.getValue());
    this.tableDataService.isLoading
      .pipe(takeUntil(this.subscriber))
      .subscribe((value: boolean) => {
        this.isLoading = value
      });
    if (this.tableDataService.scrollLocation === 0) {
      this.dataSource.loadData(this.tableDataService.lastPageIndex, this.tableDataService.virtualArray.getValue().length);
    }
  }

  ngOnDestroy(): void {
    this.tableDataService.scrollLocation = this.scrollLocation;
    this.tableDataService.expandedElement = this.expandedElement;
    this.tableDataService.selection = this.selection;
    this.subscriber.next();
    this.subscriber.complete();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.tableRef?.nativeElement.scrollTo(0, this.tableDataService.scrollLocation);
    });
  }
}
