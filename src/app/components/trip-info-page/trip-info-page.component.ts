import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { TableDataSourceService } from "../../services/table-data-source/table-data-source.service";

@Component({
  selector: 'app-trip-info-page',
  templateUrl: './trip-info-page.component.html',
  styleUrls: ['./trip-info-page.component.scss']
})
export class TripInfoPageComponent {
  tripInfo = this.tableDataSourceService.virtualArray.getValue()
    .find(value => value?.id === this.route.snapshot.params['id']);

  constructor(
    public tableDataSourceService: TableDataSourceService,
    public route: ActivatedRoute
  ) { }
}
