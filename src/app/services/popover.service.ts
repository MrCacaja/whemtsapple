import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  async presentLoading(message = 'Carregando...', duration = 0) {
    const loading = await this.loadingCtrl.create({
      message,
      duration,
    });
    await loading.present();
    return loading;
  }

  async presentToast(
    color:
      | 'light'
      | 'medium'
      | 'danger'
      | 'dark'
      | 'secondary'
      | 'tertiary'
      | 'primary'
      | 'success'
      | 'warning',
    message: string,
    header: string,
    duration = 3000
  ) {
    const toast = await this.toastCtrl.create({
      header,
      message,
      color,
      position: 'top',
      cssClass: 'error',
      icon: 'close',
      duration,
    });
    await toast.present();
  }
}
