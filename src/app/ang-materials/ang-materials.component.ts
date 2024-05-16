import { Component } from '@angular/core';
import material from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { AngMatAutoCompleteComponent } from '../ang-mat-auto-complete/ang-mat-auto-complete.component';

@Component({
  selector: 'app-ang-materials',
  standalone: true,
  imports: [MatButtonModule, AngMatAutoCompleteComponent],
  templateUrl: './ang-materials.component.html',
  styleUrl: './ang-materials.component.scss'
})
export class AngMaterialsComponent {

}
