import { Injectable } from '@angular/core';
import { UIText } from '@app/+form/classes/text.class';
import { ElementsTypes } from '@app/+form/classes/element.class';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ElementsStackService {
    public stack: any[];
    public stack$;
    public stackObserver;
    public cursorPosition = 0;


    constructor() {
        this.stack$ = new Observable(observer => this.stackObserver = observer);
    }

    addElement(type){
        let element;
        switch (type){
            case ElementsTypes.Text:
                element = new UIText();
                this.stack.splice( this.cursorPosition, 0, element );
                break
        }
        this.stackObserver.next(this.stack);
        return element
    }



}