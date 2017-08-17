import { Injectable } from '@angular/core';
import {UIFormList} from '../classes/forms-list.class'

@Injectable()
export class FormsListService {

  private formList: UIFormList;

  public loadForms(nodes: any[]){
    let selected = this.formList && this.formList.selectedFormId
    this.formList = new UIFormList(nodes, selected)
    return this.formList
  }

  public getForm(id){
    return id && this.formList.getForm(id)
  }

  public createForm(params){
    return UIFormList.createForm(params)
  }

}