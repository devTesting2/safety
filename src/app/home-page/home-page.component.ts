import { Component, ElementRef, OnInit, ViewChild, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { TimelineMax } from 'gsap';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @ViewChild('animeObject') AnimationObject: ElementRef;
  @ViewChild('animeItem1') animeItem1: ElementRef;
  @ViewChild('animeItem2') animeItem2: ElementRef;
  @ViewChild('animeItem3') animeItem3: ElementRef;
  @ViewChild('animeBottom') animeBottom: ElementRef;

  constructor() {}

   ngOnInit() {
    setTimeout(()=>{
      this.layerAnimation();
    }, 100);
  }
  
  layerAnimation(){
    let anime: TimelineMax = new TimelineMax();
    const el :HTMLElement | null = document.getElementById("container");
    el && (el.style.display='block');
    
    anime.from(this.AnimationObject.nativeElement, 0.5, { opacity: 0, scale: 3, x: 0, ease: "elastic.out(1, 0.5) "}, "+=0.5");
    anime.from(this.animeItem1.nativeElement, 0.4, { opacity: 0, x: 500, ease: "elastic.out(0.6, 3.0) "}, "+=0.5");
    anime.from(this.animeItem2.nativeElement, 0.4, { opacity: 0, x: 500, ease: "elastic.out(0.6, 3.0) "}, "+=0.3");
    anime.from(this.animeItem3.nativeElement, 0.4, { opacity: 0, x: 500, ease: "elastic.out(0.6, 3.0) "}, "+=0.3");
    anime.from(this.animeBottom.nativeElement, 1, { opacity: 0 }, "+=0.5");

    return anime;
  }
}
