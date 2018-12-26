import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EquipmentComponent} from '../components/equipment/equipment.component';
import {ReportComponent} from '../components/report/report.component';
import {DefectComponent} from '../components/defect/defect.component';
import {EquipmentDashboardComponent} from '../components/equipment/equipment-dashboard/equipment-dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipment',
    pathMatch: 'full'},
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'defects',
    component: DefectComponent},
  {
    path: 'equipment',
    component: EquipmentComponent,
    children: [
      {
        path: '', component: EquipmentDashboardComponent
      },
      {
        path: ':id', component: EquipmentDashboardComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule {
}
