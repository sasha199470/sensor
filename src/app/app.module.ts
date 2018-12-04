import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/root-component/app.component';
import {RouterModule} from './router/router.module';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { ReportComponent } from './components/report/report.component';
import { DefectComponent } from './components/defect/defect.component';
import {RouterRoutingModule} from './router/router-routing.module';
import { EquipmentMenuComponent } from './components/equipment/equipment-menu/equipment-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    EquipmentComponent,
    ReportComponent,
    DefectComponent,
    EquipmentMenuComponent
  ],
  imports: [
    BrowserModule,
    RouterRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
