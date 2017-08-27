import {
  ChangeDetectorRef,
  Component, Input
} from '@angular/core';
import { FormsListService } from "../forms-list/services/forms-list.service"
import { UIForm } from "../forms-list/classes/form.class"
import { FormsApiService } from "@app/services/forms-api.service"
const config = require('@app/config.json')

@Component({
  selector: 'form-props',
  styleUrls: [ './form-props.component.scss' ],
  templateUrl: './form-props.template.html'
})
export class FormsPropsComponent {
  public form: UIForm
  public formInputs = config.formInputs
  public isLoading

  constructor(
    private formSrv: FormsListService,
    private formApi: FormsApiService,
    private ref: ChangeDetectorRef
  ) {

  }

  @Input() set formId(id){
    this.form = this.formSrv.getForm(id)
  }

  public isFieldRequired(field){
    return field.invalid && (field.dirty || field.touched)
  }

  public deleteForm(){
    this.formApi.removeForm(this.form.id)
    this.formSrv.getFormList().selectedFormId = null
  }
  public saveForm(){
    this.isLoading = true;
    this.formApi.update(this.form.serialize())
    setTimeout(()=>{
      this.isLoading = false
      this.ref.detectChanges()
    }, 500)
  }
}
