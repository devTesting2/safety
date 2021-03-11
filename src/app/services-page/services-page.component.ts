import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {

  clicked:boolean = false;

  constructor() { }
  ngOnInit() { }

  readMore()
  {
    this.clicked = !this.clicked;
  }

}
