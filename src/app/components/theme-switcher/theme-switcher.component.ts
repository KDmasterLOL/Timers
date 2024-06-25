import { Component, OnInit } from '@angular/core';
import { ThemeService, type Theme } from '@services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
  current_theme!: Observable<Theme>
  constructor(private theme: ThemeService) { this.current_theme = theme.theme }
  switchTheme() { this.theme.toggle() }
}
