import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError } from "rxjs/operators";

import { TableDataSourceService } from "../../../../services/table-data-source/table-data-source.service";

export interface Trip {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  createdOn: string;
  status: string;
  actions: any[];
}

export const TRIPS: Trip[] = [
  {
    id: '0',
    description: 'Bahrain',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'Emilia Romagna',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'Portugal',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'Spain',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'Monaco',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'Azerbaijan',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'France',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'Austria',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'Great Britain',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
  {
    id: '0',
    description: 'Hungary',
    startDate: '05/11/2021',
    endDate: '05/26/2021',
    createdOn: 'May 13 2021 2:50:18pm',
    status: 'Active',
    actions: []
  },
];

export type RowData = Trip | null;
export type TableData = RowData[];

export class TableDataSource implements DataSource<RowData> {
  private virtualArray: BehaviorSubject<TableData> = new BehaviorSubject<TableData>(Array.from({ length:  this.tableDataSource.partSize }));
  private readonly _subscription = new Subscription();

  constructor(private tableDataSource: TableDataSourceService, virtualArray?: TableData) {
    if (virtualArray?.length) {
      this.virtualArray.next(virtualArray);
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<TableData> {
    return this.virtualArray.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.virtualArray.complete();
    this._subscription.unsubscribe();
  }

  public loadData(index: number, size: number = this.tableDataSource.partSize) {
    this.tableDataSource.updatePageIndex(index, size)
      ?.pipe(
        catchError(() => of([]))
      )
      ?.subscribe(value => this.virtualArray.next(value));
  }
}

