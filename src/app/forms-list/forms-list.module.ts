import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsListComponent } from "./forms-list.component"
import { FormListBranch } from "./form-list-branch/form-list-branch.component"
import { FormsGroup } from "./pipes/forms-group"
import { FormsSearch } from "./pipes/forms-search"
import { SharedModule } from '@app/shared/shared.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    FormsListComponent,
    FormListBranch,
    FormsGroup,
    FormsSearch
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers:[
  ]
})
export class FormsListModule {

}
