import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './form.routes';
import { UIFormComponent } from './form.component';

console.log('`Form` bundle loaded asynchronously');

@NgModule({
  declarations: [
    UIFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class UIFormModule {
  public static routes = routes;
}
