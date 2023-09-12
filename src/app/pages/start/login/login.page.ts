import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { APP_PATHS } from 'src/app/consts/routes';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverService } from 'src/app/services/popover.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
})
export class LoginPage {
  public form: FormGroup;

  constructor(
    fb: FormBuilder,
    private navCtrl: NavController,
    private authSrvc: AuthService,
    private popoverSrvc: PopoverService,
    private errorSrvc: ErrorService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    const loading = await this.popoverSrvc.presentLoading('Conectando...');

    try {
      await this.authSrvc.login(email, password);
      await this.navCtrl.navigateRoot(APP_PATHS.main.root);
    } catch (e) {
      await this.errorSrvc.handleError(e);
    }

    await loading.dismiss();
  }

  async goToRegister() {
    await this.navCtrl.navigateForward(APP_PATHS.start.register);
  }
}
