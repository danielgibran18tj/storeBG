import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  // ng g d domains/shared/directives/highlight

  element = inject(ElementRef);

  constructor() { }

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor  = "red"
    
  }
}
