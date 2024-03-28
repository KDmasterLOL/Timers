import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appAutosize]',
  standalone: true
})
export class AutosizeDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.resize()
  }
  @HostListener('input') resize() {
    const input_element = this.el.nativeElement as HTMLInputElement
    input_element.style.width = input_element.value.length + 'ch'
  }

}
