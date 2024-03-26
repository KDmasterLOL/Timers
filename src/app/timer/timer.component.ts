import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArcProgressComponent } from '../arc-progress/arc-progress.component';
import { Timer, TimersService } from '../timers.service';
import { time_to_string } from '../time';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ArcProgressComponent],
  template: `
      <figure>
        <figcaption [class.edited]="is_edit_name">
          <span>
            <button (click)="toggle_edit()"><img src="../../assets/Pen Icon.svg" alt=""></button>
            @if(is_edit_name){
              <input type="text" #el (keydown.enter)="change_name($event)" [value]="name"
                [style.width]="name.length+'ch'" (input)="resize($event)">
            }
            @else {
              {{name}}
            }
          </span>
        </figcaption>
        <app-arc-progress
          [progress]="current_progress"
          [size]="100">
            <input type="number" from="0" value="10"/>
          <span>
            {{content}}</span>
        </app-arc-progress>
      </figure>
  `,
  styles: `
    @use "sass:math";
    @import '/mixins.scss';
    figure {
      position: relative;
      padding-top: 1.15rem;
      margin: 0;
      @include flex-center();

      figcaption {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        overflow: hidden;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        transition: background-color ease-out 0.25s;


        span {
          position: relative;

          input {
            font-family: monospace;
            &[type=number]{
              width: 5ch;
            }
          }

          button {
            background: none;
            border: none;
            cursor: pointer;

            visibility: hidden;

            $size: 1rem;

            // TODO: Make some transitions
            img {
              width: $size;
              height: $size;
            }

            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -1 * calc($size + 0.4rem);

            filter: invert(1);
          }

        }

        &:hover,
        &.edited {
          text-overflow: none;
          overflow: visible;

          span {
            button {
              visibility: visible;
            }

            display: inline-block;
            background-color: var(--back-second);
          }
        }
      }
    }
  `
})
export class TimerComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) name!: string
  id_interval: NodeJS.Timeout | undefined
  current_progress: number = 0
  is_edit_name: boolean = false
  is_edit_timeoffset: boolean = false

  private get timer(): Timer { return this.timers.timers[this.name] }
  constructor(private cd: ChangeDetectorRef, private timers: TimersService) { }
  ngAfterViewInit(): void { if (typeof window !== 'undefined') this.start() }
  public get content(): string { return time_to_string(this.timer.remain_time) }

  start() {
    const tick = () => {
      this.current_progress = this.timer.progress
      if (this.current_progress != 0) requestAnimationFrame(tick)
      this.cd.detectChanges()
    }
    tick()
    console.log("Timer started")
  }

  resize(event: Event) {
    const input = event.target as HTMLInputElement
    input.style.width = input.value.length + 'ch'
  }
  toggle_edit() {
    this.is_edit_name = !this.is_edit_name
  }
  change_name(event: Event) {
    this.is_edit_name = false
    const target = event.target as HTMLInputElement
    if (target.value != this.name)
      this.timers.rename_timer(this.name, target.value)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof window !== 'undefined') this.start()
  }
}

