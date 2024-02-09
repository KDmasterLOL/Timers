import { ChangeDetectorRef, Component, Input, SimpleChanges, afterRender } from '@angular/core';

@Component({
  selector: 'app-circle',
  standalone: true,
  imports: [],
  templateUrl: './circle.component.html',
  styleUrl: './circle.component.scss'
})
export class CircleComponent {

  @Input() diameter: number = 70
  @Input() stroke_width: number = 10

  public get radius(): number { return this.diameter / 2 }

  center: number = 0
  dash_array: number = 0
  dash_offset: number = 0
  viewBox: string = "0 0 0 0"

  ngOnInit(): void {
    {
      const side_box_length = this.diameter + this.stroke_width
      this.viewBox = [0, 0, side_box_length, side_box_length].join(" ")
    }
    {
      const arc_length = this.radius * 2 * Math.PI
      this.dash_array = Math.round(arc_length)
    }
    this.center = this.radius + this.stroke_width / 2
  }
}
