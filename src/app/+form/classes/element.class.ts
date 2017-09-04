import * as url from 'nanoid/url'
import * as generate from 'nanoid/generate'

export abstract class UIElement {
  value
  id
  alias
  valueSource = 0

  constructor (data = {}) {
    this.id = generate(url, 10)
    _.each(data, (prop, name) => {
      this[name] = prop
    })
  }
}

export enum ElementsTypes {
  Text,
  Date,
  Time,
  Select,
  Textarea,
  Grid,
  Button,
  FormLink
}