import { Injectable } from '@angular/core';
import {UIFormList} from '../classes/forms-list.class'

@Injectable()
export class FormsListService {
  private formList: UIFormList;

  public loadForms(nodes: any[]){
    this.formList = new UIFormList(nodes)
    return this.formList
  }

  public getForms(){
    return this.formList.values()
  }

  public getForm(id){
    return id && this.formList.getForm(id)
  }

  public newForm(){
    this.formList.newForm()
  }

}