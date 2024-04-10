import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-arc-progress',
  standalone: true,
  imports: [],
  template: `
  <svg [attr.viewBox]="view_box" [style.--radius]="(diameter/2)+'px'" [style.--stroke]="stroke_width+'px'" [style.--progress]="1-progress" >
    <circle
      [attr.stroke-dashoffset]="dash_offset"
      [attr.stroke]="this.progress == 0 ? 'transparent' : 'var(--contrast-color)'"
      cx="50%" cy="50%"></circle>
  </svg>
  <div><ng-content></ng-content></div>

`,
  styles: `
  @use 'sass:math';
  $size: calc(var(--stroke) + var(--radius) * 2);
  :host{
    position: relative;
    width: $size; height: $size;
    display: block;
  }
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%);
  }
  svg {
    width: $size; height: $size;

    circle {
      $dash-array: calc(var(--radius) * math.$pi * 2);
      fill: none;
      r: var(--radius);
      stroke-width: var(--stroke);
      transform: rotate(-90deg); transform-origin: 50% 50%;
      stroke-dasharray: $dash-array;
      stroke-dashoffset: calc(var(--progress) * $dash-array)
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

  public get view_box(): string {
    const size = this.diameter + this.stroke_width
    return [0, 0, size, size].join(" ")
  }
  public get dash_offset(): number { return this.diameter * Math.PI * (1 - this.progress) }
}
