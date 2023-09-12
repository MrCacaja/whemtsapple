import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from "../../../components/button/button.component";
import { APP_PATHS } from 'src/app/consts/routes';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, InputComponent, ReactiveFormsModule, ButtonComponent]
})
export class LoginPage {
  public form: FormGroup;

  constructor(fb: FormBuilder, private navCtrl: NavController) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {

  }

  async goToRegister() {
    await this.navCtrl.navigateForward(APP_PATHS.start.register);
  }

}
