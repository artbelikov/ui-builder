import { Injectable } from '@angular/core';
import { UIText } from '@app/+form/classes/text.class';
import { ElementsTypes } from '@app/+form/classes/element.class';
import { UIDate } from '@app/+form/classes/date.class'
import { UITime } from '@app/+form/classes/time.class'
import { UISelect } from '@app/+form/classes/select.class'

@Injectable()
export class ElementsService {

    constructor() {
    }

    addElement(type, data?){
        let element;
        let currentEl:any = ElementsTypes[type]
        switch (currentEl){
            case ElementsTypes.Text:
                element = new UIText(data);
                break
            case ElementsTypes.Date:
                element = new UIDate(data);
                break
            case ElementsTypes.Time:
                element = new UITime(data);
                break
            case ElementsTypes.Select:
                element = new UISelect(data);
                break
        }
        return element
    }

    load(elements){
      elements = _.map(elements, elem => this.addElement(elem.type, elem))
      return elements
    }

}