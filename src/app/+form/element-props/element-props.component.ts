import {
  Component, Input,
} from '@angular/core'

@Component({
  selector: 'element-props',
  templateUrl: './element-props.component.html' ,
  styleUrls: ['./element-props.component.scss']
})
export class ElementPropsComponent {
  element
  @Input()
  set elementIns(element){
    this.element = element
  }
}
