import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import * as url from 'nanoid/url';
import * as generate from 'nanoid/generate';
import {UIFormList} from './classes/forms-list.class'
import { FormsListService } from "./services/forms-list.service"
import { FormsApiService } from "../services/forms-api.service"
import { UIForm } from "./classes/form.class"

@Component({
  selector: 'forms-list',
  providers: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ './forms-list.component.scss' ],
  templateUrl: './forms-list.template.html'
})
export class FormsListComponent {
  forms: UIFormList;
  formGroups: any[] = []
  selectedFormGroup: string
  searchText: string;
  subscribtion
  selectedFormId: string

  constructor(
    private formsListSrv: FormsListService,
    private api:FormsApiService,
    private ref: ChangeDetectorRef
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
    // System.import('./forms.json')
    //   .then((json) => {
    //   this.forms = this.formsListSrv.loadForms(json)
    //   })


  }

  public ngOnInit(){
    this.subscribtion = this.api.forms$.subscribe((forms) => {
      console.warn(forms)
      this.forms = this.formsListSrv.loadForms(forms)
      if(this.selectedFormId){
        this.forms.selectedFormId = this.selectedFormId
        this.selectedFormId = null
      }
      this.ref.markForCheck();
    }, (err) => {
      console.error(err);
    });
  }

  public ngOnDestroy() {
    this.subscribtion.unsubscribe();
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
    let newForm = this.formsListSrv.createForm({ group: this.selectedFormGroup })
    this.selectedFormId = newForm.id
    this.api.createForm(newForm)
  }
}
