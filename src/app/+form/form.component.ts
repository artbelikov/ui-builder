import { ChangeDetectorRef, Component, } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormsApiService } from '@app/services/forms-api.service'
import { ElementsService } from '@app/+form/services/elements.service'

@Component({
  selector: 'ui-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class UIFormComponent {
  public formId
  public form;
  public selectedElement
  public whileDraging
  public cursorPosition = 0

  constructor (private elements: ElementsService,
               private ref: ChangeDetectorRef,
               private formsApi: FormsApiService,
               private route: ActivatedRoute) {
    this.formId = _.get(this.route, 'snapshot.params.id')
  }

  public ngOnInit () {
    this.formsApi.fetchForm(this.formId).then(form => {
      form.elements = form.elements ? this.elements.load(form.elements) : []
      console.warn(form.elements)
      this.form = form
      this.ref.detectChanges()
    })
  }

  public getElement(id){
    return this.form && _.find(this.form.elements, elem => elem.id === id)
  }

  public selectElement(event, elem){
    event.stopPropagation()
    this.selectedElement = elem ? elem.id : null
  }

  public addElement(event){
    this.whileDraging = false
    let elementType = event.dataTransfer.getData("text/plain")
    console.warn(elementType)
    let element = this.elements.addElement(elementType)
    this.form.elements.splice(this.cursorPosition, 0, element)
    this.cursorPosition = this.form.elements.length
    console.warn(element)
  }

  public isElementCursor (i) {
    return this.whileDraging && this.cursorPosition === i
  }

  public pointCursor (i) {
    this.cursorPosition = i
  }

  public onDragover () {
    this.whileDraging = true
  }

  public onLeave () {
    this.whileDraging = false
  }

}
