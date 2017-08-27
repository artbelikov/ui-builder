import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { APIService } from "./api.service"
import { ModalService, modalTypes } from "@app/services/modal.service"
import { UIFormList } from '@app/services/classes/forms-list.class'

@Injectable()
export class FormsApiService{
  public forms$: Observable<UIFormList>;
  private formsObserver: Observer<UIFormList>;
  private feathersService: any;
  private dataStore: {
    forms: UIFormList
  };

  constructor(
    private api: APIService,
    private modal: ModalService
    ) {
    this.feathersService = this.api.feathersApp.service('forms');
    this.feathersService.on('created', (form) => this.onCreated(form));
    this.feathersService.on('updated', (form) => this.onUpdated(form));
    this.feathersService.on('removed', (form) => this.onRemoved(form));

    this.forms$ = Observable.create((observer) => {
      console.warn(observer)
      this.formsObserver = observer
    });
    console.warn(this.forms$)
    this.dataStore = { forms: new UIFormList([], null) };

    this.api.socket.on('trigger', this.trigger.bind(this) )

  }

  public remove(id){
    this.modal.callModal(modalTypes.Confirm, 'Delete selected form?').then( resolve => {
      this.feathersService.remove(id)
    }, reject => {}).catch(() => {})
  }

  public trigger(event){
    switch (event){
      case 'connection':
        this.find()
        break
    }
  }

  public update(form){
    this.feathersService.update(form.id, form)
  }

  public find() {
    this.feathersService.find((err, forms) => {
      if (err) return console.error(err);
      let selected = this.dataStore.forms && this.dataStore.forms.selectedFormId
      this.dataStore.forms = new UIFormList(forms.data, selected);
      this.formsObserver && this.formsObserver.next(this.dataStore.forms);
    });
  }

  public getForm(id: string) {
    return this.dataStore.forms.getForm(id);
  }

  public getFormsList(){
    return this.dataStore.forms
  }

  public createForm({group, parentId}){
    let form = UIFormList.createForm({group, parentId})
    this.feathersService.create(form)
    return form
  }

  private onCreated(form) {
    this.dataStore.forms.set(form);
    this.formsObserver.next(this.dataStore.forms);
  }

  private onUpdated(form) {
    this.dataStore.forms.set(form)
    this.formsObserver.next(this.dataStore.forms);
  }

  private onRemoved(form) {
    this.dataStore.forms.remove(form.id);
    this.formsObserver.next(this.dataStore.forms);
  }

}