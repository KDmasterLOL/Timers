import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const themes = ['light', 'dark'] as const
export type Theme = typeof themes[number];
const THEME = 'theme'
@Injectable({ providedIn: 'root' })
export class ThemeService {
  __theme: BehaviorSubject<Theme> = new BehaviorSubject('light' as Theme)

  public get theme(): Observable<Theme> { return this.__theme.asObservable() }
  public set theme(next_theme: Theme) {
    this.__theme.next(next_theme);
    console.log('New theme ', next_theme)
    document.documentElement.dataset[THEME] = next_theme
    localStorage.setItem(THEME, next_theme)
  }

  restorePrevTheme() {
    const last_theme = localStorage.getItem(THEME)
    if (last_theme !== null) this.theme = last_theme as Theme
    else this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) this.restorePrevTheme()
  }
  toggle() { this.theme = this.__theme.getValue() == 'light' ? 'dark' : 'light' }
}

