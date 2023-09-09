import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [IonicModule],
})
export class ButtonComponent {
  @Input() disabled = false;

  constructor() { }

}
