import {
  Component,
  Input
} from '@angular/core';
import { FormsListService } from "../services/forms-list.service"
import { UIForm } from "../classes/form.class"
import { Router } from "@angular/router"

@Component({
  selector: '[formsListBranch]',
  styleUrls: [ './form-list-branch.component.scss' ],
  templateUrl: './form-list-branch.template.html'
})
export class FormListBranch{
  form: UIForm

  constructor(
    private formsListSrv: FormsListService,
    private router: Router
  ){

  }

  @Input() set formsListBranch(id){
    this.form = this.formsListSrv.getForm(id)
  }

  navigateToFormDesign(){
    this.router.navigateByUrl('/form/'+this.form.id)
  }
}