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

  constructor(props, private $formsList){
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
    this.$formsList().select(this.id)
  }

  public isSelected(){
    return this.$formsList().isSelected(this.id)
  }

  public serialize(){
    let result: any = {}
    const skipSymbols = ['_', '$']
    _.each(<any>this, (value, prop) => {
      let firstSymbol = (<string>prop).charAt(0)
      if (skipSymbols.indexOf(firstSymbol) >= 0)return
      result[prop] = value
    })
    result.children = Array.from(this.children.values())
    console.warn(result)
    return result
  }
}