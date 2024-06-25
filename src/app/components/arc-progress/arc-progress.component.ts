import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-arc-progress',
  standalone: true,
  imports: [],
  template: `
  <svg [attr.viewBox]="view_box" [style.--radius]="(diameter/2)+'px'" [style.--stroke]="stroke_width+'px'" [style.--progress]="1-progress" >
    <circle
      [attr.stroke-dashoffset]="dash_offset"
      fill="none"
      [class]="this.progress == 0 ? 'stroke-transparent' : 'stroke-base-content'"
      class="-rotate-90 origin-center"
      cx="50%" cy="50%"></circle>
  </svg>
  <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-75%]"><ng-content></ng-content></div>

`,
  styles: `
  @use 'sass:math';
  $size: calc(var(--stroke) + var(--radius) * 2);
  :host{
    position: relative;
    width: $size; height: $size;
    display: block;
  }
  svg {
    width: $size; height: $size;

    circle {
      $dash-array: calc(var(--radius) * math.$pi * 2);
      r: var(--radius);
      stroke-width: var(--stroke);
      stroke-dasharray: $dash-array;
      stroke-dashoffset: calc(var(--progress) * $dash-array)
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
