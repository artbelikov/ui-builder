import { Injectable } from "@angular/core"


@Injectable()
export class ModalService {

  constructor(){

  }

  public callModal(type = ModalTypes.Simple, message){
    return new Promise((resolve, reject) => {
      switch(type){
        case ModalTypes.Confirm:
          let result = confirm(message)
          result ? resolve() : reject()
          break
      }
    })
  }
}

enum ModalTypes{
  Confirm,
  Simple,
  Card,
  Error
}

export const modalTypes = ModalTypes