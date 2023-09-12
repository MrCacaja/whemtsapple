import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../button/button.component';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VALIDATION_ERRORS } from 'src/app/consts/validation-errors';
import { MaskitoModule } from '@maskito/angular';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [IonicModule, ButtonComponent, CommonModule, MaskitoModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() labelPlacement: 'end' | 'fixed' | 'floating' | 'stacked' | 'start' =
    'floating';
  @Input() type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  @Input() showPassword = false;
  @Input() mask?: MaskitoOptions;
  public disabled = false;
  public value?: string | number;
  private ngControl?: NgControl;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    try {
      this.ngControl = this.injector.get(NgControl);
    } catch (e) {}
  }

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  get errors() {
    let errors: string[] = [];
    if (this.ngControl?.errors) {
      for (const [key, value] of Object.entries(this.ngControl.errors)) {
        if (VALIDATION_ERRORS[key]) {
          let error = VALIDATION_ERRORS[key];
          for (const [key2, value2] of Object.entries(value)) {
            error = error.replace(`{{${key2}}}`, value2 + '');
          }
          errors.push(error);
        }
      }
    }
    return errors;
  }

  writeValue(val: string | number): void {
    this.value = val;
  }

  onChange = (value: any) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched = () => {};

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(value: string | number) {
    if (this.disabled) {
      return;
    }

    this.onTouched();
    this.onChange(value);
  }
}
