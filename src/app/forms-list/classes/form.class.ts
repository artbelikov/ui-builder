export class UIForm{
  id: string
  title: string
  filename: string
  elements: any[]
  children: Set<string>
  onInit?: string
  parentId: string
  group?: string;
  subtitle?: string
  dataSource;
  objectType: string
  section: string
  useCache: boolean
  $$runFunction: boolean

  constructor(props, private formsList){
    if (!props.id) {
      return;
    }
    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop]
      }
    }
    this.$$runFunction = !!this.onInit
    this.dataSource = this.dataSource || {}
    this.children = new Set(<string[]>props.children)
  }

  public hasChildren () {
    return !!this.children.size
  }

  public isRoot () {
    return this.parentId == null;
  }

  public select(event){
    event.stopPropagation()
    this.formsList().select(this.id)
  }

  public isSelected(){
    return this.formsList().isSelected(this.id)
  }

  public serialize(){
    return {
      id: this.id,
      title: this.title,
      filename: this.filename,
      elements: this.elements,
      children: Array.from(this.children.values()),
      onInit: this.onInit,
      parentId: this.parentId,
      group: this.group,
      subtitle: this.subtitle,
      dataSource: this.dataSource,
      objectType: this.objectType,
      section: this.section,
      useCache: this.useCache,
    }
  }
}