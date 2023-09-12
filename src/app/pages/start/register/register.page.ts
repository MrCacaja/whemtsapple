import { Component, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { equalField } from 'src/app/validators/equal-field';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverService } from 'src/app/services/popover.service';
import { PHONE_MASK } from 'src/app/consts/maskito-masks';
import { APP_PATHS } from 'src/app/consts/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
  ],
})
export class RegisterPage {
  public readonly phoneMask = PHONE_MASK;
  public form: FormGroup;

  constructor(
    fb: FormBuilder,
    private authSrvc: AuthService,
    private popoverSrvc: PopoverService,
    private navCtrl: NavController,
    private errorHandler: ErrorHandler
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      phone: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          equalField('password', 'Senha'),
        ],
      ],
    });
  }

  async register() {
    if (this.form.invalid) return;

    const { email, phone, password, name } = this.form.value;
    const user: Partial<User> = {
      email,
      phone,
      name,
    };
    const loading = await this.popoverSrvc.presentLoading('Criando usuário...');
    this.form.disable();

    try {
      await this.authSrvc.createUser(email, password, user);
      await this.navCtrl.navigateRoot(APP_PATHS.main.root);
    } catch (e) {
      this.errorHandler.handleError(e);
      this.form.enable();
    }

    await loading.dismiss();
  }
}
