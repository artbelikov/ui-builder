import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { routes } from './form.routes'
import { UIFormComponent } from './form.component'
import { ToolbarComponent } from '@app/+form/toolbar/toolbar.component'
import { ElementsService } from '@app/+form/services/elements.service'
import { DropareaDirective } from '@app/+form/services/droparea.directive'
import { SharedModule } from '@app/shared/shared.module'
import { FormsModule } from '@angular/forms'
import { ElementPropsComponent } from '@app/+form/element-props/element-props.component'

@NgModule({
  declarations: [
    UIFormComponent,
    ToolbarComponent,
    DropareaDirective,
    ElementPropsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ElementsService
  ]
})
export class UIFormModule {
  public static routes = routes
}
