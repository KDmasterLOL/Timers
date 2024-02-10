import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, afterRender } from '@angular/core';
import { ArcProgressComponent } from '../arc-progress/arc-progress.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ArcProgressComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnChanges, OnDestroy, OnInit {
  @Input() time: number = 30
  remain_time: number = 0
  id_interval: NodeJS.Timeout | undefined
  interval = 250
  public get progress(): number { return this.remain_time / this.time }

  constructor(private cdr: ChangeDetectorRef) {
    afterRender(() => {
      if (this.id_interval == undefined)
        this.id_interval = setInterval(() => { this.remain_time -= this.interval / 1000; this.cdr.detectChanges() }, this.interval)
    })
  }
  ngOnInit(): void {
    this.remain_time = this.time
  }
  ngOnDestroy(): void {
    if (this.id_interval) clearInterval(this.id_interval)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.remain_time = this.time
  }
}
