import {
  Component,
  Input
} from '@angular/core';
import { Router } from "@angular/router"
import { FormsApiService } from '@app/services/forms-api.service'

@Component({
  selector: '[formsListBranch]',
  styleUrls: [ './form-list-branch.component.scss' ],
  templateUrl: './form-list-branch.template.html'
})
export class FormListBranch{
  form

  constructor(
    private formsApi: FormsApiService,
    private router: Router
  ){

  }

  @Input() set formsListBranch(id){
    this.form = this.formsApi.getForm(id)
  }

  navigateToFormDesign(){
    this.router.navigateByUrl('/form/'+this.form.id)
  }
}