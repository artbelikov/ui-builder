import {
  Component, Input
} from '@angular/core';
import { FormsListService } from "../forms-list/services/forms-list.service"
import { UIForm } from "../forms-list/classes/form.class"
import { FormsApiService } from "@app/services/forms-api.service"

@Component({
  selector: 'form-props',
  styleUrls: [ './form-props.component.scss' ],
  templateUrl: './form-props.template.html'
})
export class FormsPropsComponent {
  public form: UIForm

  constructor(
    private formSrv: FormsListService,
    private formApi: FormsApiService
  ) {}

  @Input() set formId(id){
    this.form = this.formSrv.getForm(id)
  }

  public isFieldRequired(field){
    return field.invalid && (field.dirty || field.touched)
  }

  public deleteForm(){

  }
  public saveForm(){
    this.formApi.update(this.form.serialize())
  }
}
