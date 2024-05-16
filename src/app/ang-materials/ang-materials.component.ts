import { Component } from '@angular/core';
import material from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ang-materials',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './ang-materials.component.html',
  styleUrl: './ang-materials.component.scss'
})
export class AngMaterialsComponent {

}
