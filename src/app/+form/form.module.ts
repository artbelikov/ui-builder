import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { routes } from './form.routes'
import { UIFormComponent } from './form.component'
import { ToolbarComponent } from '@app/+form/toolbar/toolbar.component'
import { ElementsStackService } from '@app/+form/services/elements-stack.service'
import { DropareaDirective } from '@app/+form/services/droparea.directive'
import { SharedModule } from '@app/shared/shared.module'
import { FormsModule } from '@angular/forms'

console.log('`Form` bundle loaded asynchronously')

@NgModule({
  declarations: [
    UIFormComponent,
    ToolbarComponent,
    DropareaDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ElementsStackService
  ]
})
export class UIFormModule {
  public static routes = routes
}
