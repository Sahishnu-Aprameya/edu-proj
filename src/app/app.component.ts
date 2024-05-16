import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BindingsComponent } from './bindings/bindings.component';
import { AngMaterialsComponent } from './ang-materials/ang-materials.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BindingsComponent, AngMaterialsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'edu-proj';
}
