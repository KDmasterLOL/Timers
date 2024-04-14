import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private elem: ElementRef<HTMLInputElement>) { }
  ngAfterViewInit(): void {
    this.elem.nativeElement.focus()
  }
}
