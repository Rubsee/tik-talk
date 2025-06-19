import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../feature-sidebar';


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
