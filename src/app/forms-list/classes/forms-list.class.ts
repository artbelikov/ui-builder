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
      this.formsList.set(_node.id, new UIForm(_node, this.getThisFormList.bind(this)))
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

  public newForm(parentId = null){
    let _nodeTemplate: any = {}
    _nodeTemplate.id = generate(url, 14);
    _nodeTemplate.parentId = parentId;
    this.formsList.set(_nodeTemplate.id, new UIForm(_nodeTemplate, this.getThisFormList.bind(this)))
    this._makeRoots()
    return _nodeTemplate.id
  }

  public select(id){
    this.selectedFormId = id
  }

  public isSelected(id){
    return this.selectedFormId === id
  }

}