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
  dataSource

  constructor(props, private formsList){
    if (!props.id) {
      return;
    }
    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        this[prop] = props[prop]
      }
    }
    this.children = new Set(<string[]>props.children)
  }

  public hasChildren () {
    return !!this.children.size
  }

  public isRoot () {
    return this.parentId == null;
  }

  public select(){
    this.formsList().select(this.id)
  }

  public isSelected(){
    return this.formsList().isSelected(this.id)
  }
}