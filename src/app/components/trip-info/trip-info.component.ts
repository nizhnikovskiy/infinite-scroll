import { Component, Input } from '@angular/core';

import { RowData } from "../table-page/virtual-scroll-table/helpers/data-source.helper";

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.scss']
})
export class TripInfoComponent {
  @Input() tripInfo: RowData | undefined;

  constructor() { }
}
