import {
  Component
} from '@angular/core';
import * as url from 'nanoid/url';
import * as generate from 'nanoid/generate';
import {UIFormList} from './classes/forms-list.class'
import { FormsListService } from "./services/forms-list.service"

@Component({
  selector: 'forms-list',
  providers: [
  ],
  styleUrls: [ './forms-list.component.scss' ],
  templateUrl: './forms-list.template.html'
})
export class FormsListComponent {
  forms: UIFormList;
  formGroups: any[] = []
  selectedFormGroup: string
  searchText: string;

  constructor(
    private formsListSrv: FormsListService
  ) {
    // console.warn()
    // let forms = []
    // for (let i = 0; i < 10; i++){
    //   let form = {
    //     id: generate(url, 14),
    //     title: "Form name "+i,
    //     filename: `form${i}.json`,
    //     elements: [],
    //     children: [],
    //     onInit: '',
    //     parentId: null,
    //     subtitle: "Form subtitle",
    //     dataSource: {
    //       type: 0,
    //       functionName: 'handler.function'+i,
    //       arguments: "{foo:\"bar\"}"
    //     }
    //   }
    //   forms.push(form)
    // }
    // console.warn(JSON.stringify(forms))
    System.import('./forms.json')
      .then((json) => {
      this.forms = this.formsListSrv.loadForms(json)
      })
  }

  public renameFromGroup(i, formGroupName){
    this.formGroups[i].name = formGroupName
    this.formGroups[i].editable = false
    this.selectFormGroup(this.formGroups[i])
  }

  public addFormGroup(){
    this.formGroups.push({
      name: 'New group'
    })
  }

  public selectFormGroup(group){
    this.searchText = null
    if (group){
      this.selectedFormGroup = group.name
    }else{
      this.selectedFormGroup = null
    }

  }

  public searchTextSelected(){
    this.selectedFormGroup = null
  }

  public createForm(){

  }
}
