import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-arc-progress',
  standalone: true,
  imports: [],
  template: `
<svg [attr.viewBox]="view_box" [style.--radius]="(diameter/2)+'px'" [style.--stroke]="stroke_width+'px'" >
  <circle
    [attr.stroke-dashoffset]="dash_offset"
    [attr.stroke]="this.progress == 0 ? 'transparent' : 'var(--contrast-color)'"
    cx="50%" cy="50%"></circle>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{{progress_message || progress}}</text>
</svg>
`,
  styles: `
  @use 'sass:math';
  :host{
    --stroke: 2px;
    --radius: 70px;
    --progress: 0;
  }
  svg {
    $size: calc(var(--stroke) + var(--radius) * 2);
    $dash-array: calc(var(--radius) * math.$pi * 2);
    width: $size; height: $size;

    circle {
      fill: none;
      r: var(--radius);
      stroke-width: var(--stroke);
      transform: rotate(-90deg); transform-origin: 50% 50%;
      stroke-dasharray: $dash-array;
    }

    text {
      stroke: var(--text-color);
      font: normal large;
    }
  }
`
})
export class ArcProgressComponent {
  @Input('size') diameter: number = 70
  @Input() progress: number = 1
  @Input() stroke_width: number = 10
  @Input() progress_message: string = ""

  public get view_box(): string {
    const size = this.diameter + this.stroke_width
    return [0, 0, size, size].join(" ")
  }
  public get dash_offset(): number { return this.diameter * Math.PI * (1 - this.progress) }
}
