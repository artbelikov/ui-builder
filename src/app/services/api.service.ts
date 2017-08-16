import { Injectable } from "@angular/core"

const feathers = require('feathers-client');
const io = require('socket.io-client');
const config = require('@app/config.json')

@Injectable()
export class APIService {
  public socket
  public feathersApp

  constructor(){
    this.socket = io(config.apiUrl);
    this.feathersApp = feathers()
      .configure(feathers.hooks())
      .configure(feathers.socketio(this.socket));
  }

}