import { ElementsTypes, UIElement } from '@app/+form/classes/element.class'

export class UISelect extends UIElement {
  public type = ElementsTypes[ElementsTypes.Select]
  public options

  public addOption () {
    this.options = this.options || []
    this.options.push({
      value: '',
      label: ''
    })
  }
}