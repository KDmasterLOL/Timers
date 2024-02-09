import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, afterRender } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() time: number = 30
  current_time: number = 0
  radius: number = 70
  stroke_width: number = 10
  id_interval: NodeJS.Timeout | undefined
  value: number = 0
  interval = 250

  constructor(private cdr: ChangeDetectorRef) {
    afterRender(() => {
      if (this.id_interval == undefined)
        this.id_interval = setInterval(() => { this.value += this.interval / 1000; this.cdr.detectChanges() }, this.interval)
    })
  }
  ngOnDestroy(): void {
    if (this.id_interval) clearInterval(this.id_interval)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.current_time = this.time
    this.dash_offset = this.dash_array * (this.current_time / 60)
  }

  ngOnInit(): void {
    const side_length = this.radius * 2 + this.stroke_width
    this.viewBox = [0, 0, side_length, side_length].join(" ")
    this.dash_array = Math.round(this.radius * 2 * Math.PI)
    this.center = this.radius + this.stroke_width / 2
  }
  center: number = 0
  dash_array: number = 0
  dash_offset: number = 0
  viewBox: string = ""
}
