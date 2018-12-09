import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EquipmentComponent} from '../components/equipment/equipment.component';
import {ReportComponent} from '../components/report/report.component';
import {DefectComponent} from '../components/defect/defect.component';


const routes: Routes = [
  { path: '', redirectTo: 'equipment/10000', pathMatch: 'full' },
  { path: 'report', component: ReportComponent  },
  { path: 'defects', component: DefectComponent  },
  { path: 'equipment/:id', component: EquipmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
