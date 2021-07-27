import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import { v4 as uuidv4 } from 'uuid';
import { SelectionModel } from "@angular/cdk/collections";

import { RowData, TableData, Trip, TRIPS } from "../../components/table-page/virtual-scroll-table/helpers/data-source.helper";

@Injectable({
  providedIn: 'root'
})

export class TableDataSourceService {
  public partSize = 20;
  private initialSize = 100;
  public virtualArray: BehaviorSubject<TableData> = new BehaviorSubject<TableData>(Array.from({ length:  100 }));
  private pageIndexes = new Set<number>();
  public scrollLocation = 0;
  public expandedElement: RowData = null;
  public selection: SelectionModel<Trip> = new SelectionModel<Trip>(true, []);
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  public updatePageIndex(index: number, size: number) {
    if (this.pageIndexes.has(index)) {
      return;
    }
    this.pageIndexes.add(index);
    return this.fetchPage(index, size).pipe(
      map((data) => {
        return this.updateVirtualArray(index, data);
      })
    )
  }

  public get lastPageIndex(): number {
    return this.pageIndexes.size === 0 ? 0 : this.pageIndexes.size - 1;
  }

  private updateVirtualArray(page: number, array: TableData): TableData {
    const data = Array.from({ length: this.initialSize + page * this.partSize }).map((_, i) => this.virtualArray.getValue()[i]);
    const from = page === 0 ? 0 : this.virtualArray.getValue().length;
    const to = from + array.length;
    for (let i = from; i < to; i++) {
      data[i] = array[i - from];
    }
    this.virtualArray.next(data);
    return data;
  }

  private getRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private fetchPage(page: number, size: number): Observable<TableData> {
    this.isLoading.next(true);
    return timer(1500).pipe(map((value) => {
      return  Array.from({ length: size }).map((_, i) => {
        const randomIndex = this.getRandomNumberBetween(0, 9);
        this.isLoading.next(false);
        return {
          ...TRIPS[randomIndex],
          id : uuidv4()
        }
      });
    }));
  }
}
