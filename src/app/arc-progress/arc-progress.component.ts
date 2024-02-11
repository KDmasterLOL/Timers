import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arc-progress',
  standalone: true,
  imports: [],
  templateUrl: './arc-progress.component.html',
  styleUrl: './arc-progress.component.scss'
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
  public get view_box(): string { return [0, 0, this.side_box_length, this.side_box_length].join(" ") }

  public get dash_offset(): number { return this.dash_array * (1 - this.progress) }
}
