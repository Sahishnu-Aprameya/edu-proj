import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-ang-mat-auto-complete',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule],
  templateUrl: './ang-mat-auto-complete.component.html',
  styleUrl: './ang-mat-auto-complete.component.scss'
})
export class AngMatAutoCompleteComponent {
  myControl = new FormControl('');
  options: string[] = ["Apple", "Banana", "Orange"];

} 
