import {
  Component,
} from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html' ,
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  buttons = [
      {
          title: 'Text input',
          element: 'text-input'
      },{
          title: 'Date input',
          element: 'data-input'
      },{
          title: 'Select',
          element: 'select'
      },
  ];

  public dragstart(event){
      event.dataTransfer.dropEffect = 'move';
  }
}
