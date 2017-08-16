import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { UIForm } from '../forms-list/classes/form.class';
import { APIService } from "./api.service"

@Injectable()
export class FormsApiService{
  feathersApp
  socket
  public forms$: Observable<UIForm[]>;
  private formsObserver: Observer<UIForm[]>;
  private feathersService: any;
  private dataStore: {
    forms: UIForm[]
  };

  constructor(private api: APIService) {
    this.feathersService = this.api.feathersApp.service('forms');
    this.feathersService.on('created', (form) => this.onCreated(form));
    this.feathersService.on('updated', (form) => this.onUpdated(form));
    this.feathersService.on('removed', (form) => this.onRemoved(form));
    console.warn(this.feathersService)
    this.forms$ = new Observable(observer => this.formsObserver = observer);

    this.dataStore = { forms: [] };

    // System.import('./forms.json').then( json => {
    //   json.forEach(form => {
    //     this.feathersService.create(form);
    //   })
    // })

  }
  public update(form){
    debugger
    this.feathersService.update(form.id, form)
  }

  public find() {
    this.feathersService.find((err, forms) => {
      if (err) return console.error(err);
      console.warn(forms)
      this.dataStore.forms = forms.data;
      this.formsObserver.next(this.dataStore.forms);
    });
  }

  private getIndex(id: string): number {
    let foundIndex = -1;

    for (let i = 0; i < this.dataStore.forms.length; i++) {
      if (this.dataStore.forms[i].id === id) {
        foundIndex = i;
      }
    }

    return foundIndex;
  }

  private onCreated(form: UIForm) {
    this.dataStore.forms.push(form);

    this.formsObserver.next(this.dataStore.forms);
  }

  private onUpdated(form: UIForm) {
    const index = this.getIndex(form.id);

    this.dataStore.forms[index] = form;

    this.formsObserver.next(this.dataStore.forms);
  }

  private onRemoved(form) {
    const index = this.getIndex(form.id);

    this.dataStore.forms.splice(index, 1);

    this.formsObserver.next(this.dataStore.forms);
  }

}