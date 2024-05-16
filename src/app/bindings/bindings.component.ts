import { Component } from '@angular/core';

@Component({
  selector: 'app-bindings',
  standalone: true,
  imports: [],
  templateUrl: './bindings.component.html',
  styleUrl: './bindings.component.scss'
})
export class BindingsComponent {
  interpolationExample: string = 'Interpolation Alert!';
  noInterpolationExample: null | undefined;

  imgSourceUrl: string = 'https://www.google.com/logos/doodles/2024/india-general-elections-2024-ph-3-6753651837110504-s.png';

  firstName: string = 'John';
  lastName: string = 'Doe';

  getFullName(): string {
    //Here, ${} is a template literal, which just injects the value given.
    return `${this.firstName} ${this.lastName}`;
  }
}
