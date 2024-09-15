import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { RouterLinkWithHref } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkWithHref, NgbCarouselModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {     // estamos en el hijo
  
  @Input() title : string = '';
  @Input() price : number = 0;
  @Input({required: true}) img : string = ''; // comunica desde el padre hacia el hijo
  @Input() product! : Product

  @Output() addToCart = new EventEmitter();   // comunica desde el hijo hacia el padre

  addToCartHandler(){
    // enviando producto seleccionado
    this.addToCart.emit(this.product);
  }
  
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

	constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.interval = 0;    // en milisegundos
		config.wrap = true;   // repite ciclo
		config.keyboard = false;  // manejo con teclado
		config.pauseOnHover = false;  //Pausa al pasar el ratón
	}


  handleInvisibleButtonClick(){
    console.log('recibiendo el click');
    
  }
}
