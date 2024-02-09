import { ChangeDetectorRef, Component, OnDestroy, afterRender } from '@angular/core';
@Component({
  selector: 'app-interval',
  standalone: true,
  imports: [],
  templateUrl: './interval.component.html',
  styleUrl: './interval.component.scss'
})
export class IntervalComponent implements OnDestroy {
  id_interval: NodeJS.Timeout | undefined
  value: number = 0
  interval = 250

  constructor(private cdr: ChangeDetectorRef) {
    afterRender(() => {
      if (this.id_interval == undefined)
        this.id_interval = setInterval(() => { this.value += this.interval / 1000; this.cdr.detectChanges() }, this.interval)
    })
  }
  destroy() {
    if (this.id_interval) clearInterval(this.id_interval)
  }
  ngOnDestroy(): void {
    this.destroy()
  }
}
