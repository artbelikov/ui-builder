import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { SidebarComponent } from "./sidebar/sidebar.component"
import { FormsListComponent } from "./forms-list/forms-list.component"

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'forms-list' },
  { path: 'forms-list', component: FormsListComponent },
  { path: 'form', loadChildren: './+form#UIFormModule' },
  //{ path: 'about', component: AboutComponent },
  //{ path: 'detail', loadChildren: './+detail#DetailModule'},
  //{ path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: FormsListComponent },
];
