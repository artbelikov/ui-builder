import { UIForm } from './form.class';
import * as url from 'nanoid/url';
import * as generate from 'nanoid/generate';
import {orderBy} from 'lodash'

export class UIFormList {
  private formsList = new Map();
  public roots: UIForm[];
  public selectedFormId;

  constructor (_nodes: any[], selectedFormId) {
    this.selectedFormId = selectedFormId
    _nodes.forEach(_node => {
      this.set(_node)
    });
    this._makeRoots()
  }

  private _makeRoots () {
    this.roots = orderBy(Array.from(this.values()).filter((node: UIForm) => node.isRoot()), 'title')
  }

  public values () {
    return this.formsList.values()
  }

  public asArray(){
    return Array.from(this.values())
  }

  public getForm (id: string): UIForm {
    return this.formsList.get(id)
  }

  public getThisFormList () {
    return this;
  }

  public serialize () {
    let out = []
    this.formsList.forEach((node: UIForm) => {
      let json: any = Object.assign({}, node);
      json.children = Array.from(node.children)

      out.push(json)
    })
    return out
  }

  public destroy (id: string) {
    let target = this.getForm(id);
    if (target.parentId) {
      let parent = this.getForm(target.parentId)
      parent.children.delete(id)
    }
    if (target.hasChildren()) {
      target.children.forEach((child: string) => {
        let theNode = this.getForm(child)
        theNode.parentId = null;
      })
    }
    this.formsList.delete(id)
    this._makeRoots()
    console.warn(this.values())
  }

  public static createForm({parentId = null, group = null} = {}){
    let _nodeTemplate: any = {
      id: generate(url, 14),
      title: 'New Form',
      filename: '',
      elements: {},
      children: [],
      onInit: '',
      parentId: parentId,
      group: group,
      subtitle: '',
      dataSource: {},
      objectType: '',
      section: '',
    }
    return _nodeTemplate
  }

  public set(form){
    this.formsList.set(form.id, new UIForm(form, this.getThisFormList.bind(this)))
  }

  public remove(id){
    this.formsList.delete(id)
  }

  public select(id){
    this.selectedFormId = id
  }

  public isSelected(id){
    return this.selectedFormId === id
  }

}