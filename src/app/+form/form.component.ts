import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core'
import { ElementsStackService } from '@app/+form/services/elements-stack.service'
import { ActivatedRoute } from '@angular/router'
import { UIFormList } from '@app/services/classes/forms-list.class'
import { FormsApiService } from '@app/services/forms-api.service'

@Component({
  selector: 'ui-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form.component.scss']
})
export class UIFormComponent {
  private subscription
  public elements
  public formId
  public form;
  public selectedElement

  constructor (private elementsStack: ElementsStackService,
               private ref: ChangeDetectorRef,
               private formsApi: FormsApiService,
               private route: ActivatedRoute) {

  }

  public ngOnInit () {
    this.subscription = this.formsApi.forms$.subscribe((forms:UIFormList) => {
      console.warn(forms)
      this.formId = _.get(this.route, 'snapshot.params.id')
      this.form = forms.getForm(this.formId)
      this.ref.markForCheck()
    }, (err) => {
      console.error(err)
    })
  }

  public ngOnDestroy () {
    this.subscription.unsubscribe()
  }

}
