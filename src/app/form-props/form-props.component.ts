import {
  ChangeDetectorRef,
  Component, Input
} from '@angular/core';
import { FormsApiService } from "@app/services/forms-api.service"
const config = require('@app/config.json')

@Component({
  selector: 'form-props',
  styleUrls: [ './form-props.component.scss' ],
  templateUrl: './form-props.template.html'
})
export class FormsPropsComponent {
  public form
  public formInputs = config.formInputs
  public isLoading

  constructor(
    private formApi: FormsApiService,
    private ref: ChangeDetectorRef
  ) {

  }

  @Input() set formId(id){
    this.form = this.formApi.getForm(id)
  }

  public isFieldRequired(field){
    return field.invalid && (field.dirty || field.touched)
  }

  public deleteForm(){
    this.formApi.remove(this.form.id)
  }
  public saveForm(){
    this.isLoading = true;
    this.formApi.update(this.form)
    setTimeout(()=>{
      this.isLoading = false
      this.ref.detectChanges()
    }, 500)
  }
}
