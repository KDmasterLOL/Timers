import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arc-progress',
  standalone: true,
  imports: [],
  template: `
<svg
  [attr.viewBox]="view_box" [attr.width]="side_box_length"
  [attr.height]="side_box_length"
>
  <circle
    [attr.r]="radius"
    [attr.stroke-dasharray]="dash_array"
    [attr.stroke-dashoffset]="dash_offset"
    [attr.stroke]="this.progress == 0 ? 'transparent' : 'var(--contrast-color)'"
    stroke-width="10" cx="50%" cy="50%"></circle>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">{{content}}</text>
  <ng-content></ng-content>
</svg>
`,
  styles: `
  svg {
    circle {
      fill: none;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }

    text {
      stroke: var(--text-color);
      font-weight: normal;
      font-size: large;

    }
  }
`
})
export class ArcProgressComponent {
  @Input('size') diameter: number = 70
  @Input() progress: number = 1
  @Input() stroke_width: number = 10
  @Input() content: string = ""

  protected get radius(): number { return this.diameter / 2 }
  protected get arc_length(): number { return this.radius * 2 * Math.PI }
  protected get dash_array(): number { return Math.round(this.arc_length) }
  protected get side_box_length(): number { return this.diameter + this.stroke_width }
  public get view_box(): string {
    return [0, 0, this.side_box_length, this.side_box_length].join(" ")
  }

  public get dash_offset(): number { return this.dash_array * (1 - this.progress) }
}
