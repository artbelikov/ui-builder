import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsListComponent } from "./forms-list.component"
import { FormListBranch } from "./form-list-branch/form-list-branch.component"
import { FormsListService } from "./services/forms-list.service"
import { FormsPropsComponent } from "../form-props/form-props.component"
import { FormsGroup } from "./pipes/forms-group"
import { FormsSearch } from "./pipes/forms-search"
import { FormsModule } from "@angular/forms"

@NgModule({
  declarations: [
    FormsListComponent,
    FormListBranch,
    FormsPropsComponent,
    FormsGroup,
    FormsSearch
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[
    FormsListService
  ]
})
export class FormsListModule {

}
