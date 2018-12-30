import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/root-component/app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { ReportComponent } from './components/report/report.component';
import { DefectComponent } from './components/defect/defect.component';
import {RouterRoutingModule} from './router/router-routing.module';
import { EquipmentMenuComponent } from './components/equipment/equipment-menu/equipment-menu.component';
import {HttpClientModule} from '@angular/common/http';
import { EquipmentDashboardComponent } from './components/equipment/equipment-dashboard/equipment-dashboard.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { EquipmentChartComponent } from './components/equipment/equipment-dashboard/equipment-chart/equipment-chart.component';
import {ChartModule} from 'angular2-chartjs';
import { EquipmentSchemeComponent } from './components/equipment/equipment-dashboard/equipment-scheme/equipment-scheme.component';
import { EquipmentDefectsComponent } from './components/equipment/equipment-dashboard/equipment-defects/equipment-defects.component';
import { ChartSensorComponent } from './components/equipment/equipment-dashboard/chart-sensor/chart-sensor.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    EquipmentComponent,
    ReportComponent,
    DefectComponent,
    EquipmentMenuComponent,
    EquipmentDashboardComponent,
    CountdownComponent,
    EquipmentChartComponent,
    EquipmentSchemeComponent,
    EquipmentDefectsComponent,
    ChartSensorComponent
  ],
  imports: [
    BrowserModule,
    RouterRoutingModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
