import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {   // componente hijo

  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef: number | undefined

  constructor(){
    // NO ASYNC
    // before render
    console.log('constructor')
    console.log('-'.repeat(10))
  }

  ngOnChanges(changes: SimpleChanges): void {
    // before and during render
    // many times
    console.log('ngOnChanges')
    console.log(changes)  // herencia del padre
    console.log('-'.repeat(10))

    const duration = changes['duration'];
    if(duration){
      if(duration.currentValue !== duration.previousValue ){
        this.doSomething();
      }
    }
  }
  
  doSomething(){
    console.log('change duration')
    // async
  }
  
  ngOnInit(): void {
    // after render
    // una vez
    // async, then, subs
    console.log('ngOnInit')
    console.log('duration => ', this.duration);
    console.log('message => ', this.message);
    console.log('-'.repeat(10))
    
    this.counterRef = window.setInterval(() => {
      console.log('run interval')
      this.counter.update(statePrev => statePrev + 1)
    }, 1000)
  }

  ngAfterViewInit() {
    // after render
    // hijos ya fueron renderizados
    console.log('ngAfterViewInit')
    console.log('-'.repeat(10))
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
    console.log('-'.repeat(10))
    window.clearInterval(this.counterRef)
  }

}
