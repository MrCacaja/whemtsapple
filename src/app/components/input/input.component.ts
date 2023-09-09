import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../button/button.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [IonicModule, ButtonComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
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
  public disabled = false;
  public value?: string | number;

  constructor() {}

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
