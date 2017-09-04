import { ElementsTypes, UIElement } from '@app/+form/classes/element.class'

interface GridColumn {
  title: string
  element: any
}

export class UIGrid extends UIElement {
  public type = ElementsTypes[ElementsTypes.Grid]
  public columns: GridColumn[]
}