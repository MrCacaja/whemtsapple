import {ErrorHandler, Injectable} from '@angular/core';
import {ErrorDict} from "../consts/error-dict";
import {PopoverService} from "./popover.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(private popoverSrvc: PopoverService) { }

  async handleError(e: any) {
    console.error(e);
    const error = e.rejection || e;
    const errors = [error.code, error.message, error.error?.code, error];
    let errorMessage = 'Erro desconhecido';
    for (const error of errors) {
      if (ErrorDict[error]) {
        errorMessage = ErrorDict[error];
        break;
      }
    }
    await this.popoverSrvc.presentToast('danger', errorMessage, 'Ocorreu um erro');
  }
}
