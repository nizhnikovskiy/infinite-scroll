import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { VirtualScrollTableComponent } from './components/table-page/virtual-scroll-table/virtual-scroll-table.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { HeaderComponent } from './components/header/header.component';
import { TablePageComponent } from './components/table-page/table-page.component';
import { TripInfoPageComponent } from './components/trip-info-page/trip-info-page.component';
import { TripInfoComponent } from './components/trip-info/trip-info.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    VirtualScrollTableComponent,
    HeaderComponent,
    TablePageComponent,
    TripInfoPageComponent,
    TripInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    ScrollingModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
