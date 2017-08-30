import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import * as url from 'nanoid/url';
import * as generate from 'nanoid/generate';
import { FormsApiService } from '@app/services/forms-api.service'
import { UIFormList } from '@app/services/classes/forms-list.class'

@Component({
  selector: 'forms-list',
  providers: [
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ './forms-list.component.scss' ],
  templateUrl: './forms-list.template.html'
})
export class FormsListComponent {
  forms: UIFormList;
  formGroups: any[] = []
  selectedFormGroup: string
  searchText: string;
  subscription
  selectedFormId: string

  constructor(
    private formsApi: FormsApiService,
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
    this.formsApi.find()
    this.subscription = this.formsApi.forms$.subscribe((forms) => {
      this.forms = forms
      this.ref.markForCheck();
    }, (err) => {
      console.error(err);
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
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
    let newForm = this.formsApi.createForm({ group: this.selectedFormGroup, parentId: null })
    this.selectedFormId = newForm.id
  }
}
