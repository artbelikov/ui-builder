import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsPropsComponent } from '@app/form-props/form-props.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    FormsPropsComponent
  ],
  exports:[
    FormsPropsComponent
  ]
})
export class SharedModule { }
