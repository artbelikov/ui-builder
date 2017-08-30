import { Injectable } from '@angular/core';
import { UIText } from '@app/+form/classes/text.class';
import { ElementsTypes } from '@app/+form/classes/element.class';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ElementsService {

    constructor() {
    }

    addElement(type){
        let element;
        let currentEl = ElementsTypes[type]
        switch (currentEl){
            case ElementsTypes.Text:
                element = new UIText();
                break
        }
        return element
    }



}