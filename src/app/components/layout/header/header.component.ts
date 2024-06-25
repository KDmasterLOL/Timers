import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeSwitcherComponent } from '@components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ThemeSwitcherComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent { }
