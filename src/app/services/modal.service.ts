import { Injectable } from "@angular/core"


@Injectable()
export class ModalService {

  constructor(){

  }

  public callModal(type = 'confirm'){
    return new Promise((resolve, reject) => {
      switch(type){
        case 'confirm':
          let result = confirm()
          result ? resolve() : reject()
          break
      }
    })
  }
}