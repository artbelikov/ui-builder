import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsListComponent } from "./forms-list.component"
import { FormListBranch } from "./form-list-branch/form-list-branch.component"
import { FormsListService } from "./services/forms-list.service"
import { FormsPropsComponent } from "../form-props/form-props.component"

@NgModule({
  declarations: [
    FormsListComponent,
    FormListBranch,
    FormsPropsComponent
  ],
  imports: [
    CommonModule,
  ],
  providers:[
    FormsListService
  ]
})
export class FormsListModule {

}
