import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { RowData } from "../table-page/virtual-scroll-table/helpers/data-source.helper";

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.scss']
})
export class TripInfoComponent implements OnInit{
  @Input() tripInfo: RowData | undefined;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.tripInfo) {
      this.router.navigate([`trips`]).then();
    }
  }
}
