import {
  Component,
} from '@angular/core';
import { ElementsTypes } from '@app/+form/classes/element.class'

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html' ,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  buttons = [
  ];

  constructor(){
    _.each(ElementsTypes, type => {
      if(typeof type === 'string'){
        this.buttons.push({
          element: type,
          title: type
        })
      }
    })
  }

  public dragstart(event, button){
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.setData("text/plain", button.element)
  }
}
