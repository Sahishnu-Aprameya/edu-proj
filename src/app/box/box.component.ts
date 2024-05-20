import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {

}
