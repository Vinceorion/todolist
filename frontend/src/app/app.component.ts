import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
