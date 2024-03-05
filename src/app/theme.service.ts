import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID, afterNextRender } from '@angular/core';

enum Themes {
  light,
  dark
}
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  __theme = Themes.light
  THEME = 'theme'

  public get theme(): Themes { return this.__theme }
  public set theme(next_theme: Themes) {
    this.__theme = next_theme;

    document.documentElement.setAttribute(this.THEME, Themes[next_theme])
    localStorage.setItem(this.THEME, Themes[next_theme])

    console.log(`Set theme to ${Themes[next_theme]} by index ${next_theme}`);
  }

  restorePrevTheme() {
    const theme = 'theme'
    const last_theme = localStorage.getItem(theme)
    console.log(`Last theme is ${last_theme}`)
    if (last_theme != null) this.theme = Themes[last_theme as keyof typeof Themes] || Themes.light;
    else this.theme = Themes.light
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.restorePrevTheme()
    }
  }
  toggle() {
    const next_theme: Themes = (this.theme + 1) % (Object.values(Themes).length / 2)
    console.log("Theme switched")
    this.theme = next_theme
  }
}

