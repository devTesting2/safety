import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches-page',
  templateUrl: './branches-page.component.html',
  styleUrls: ['./branches-page.component.css']
})
export class BranchesPageComponent implements OnInit {

  hoveredAutomation :boolean = false;
  hoveredProcess :boolean = false;
  hoveredEnergy :boolean = false;
  hoveredMedical :boolean = false;
  hoveredRailway :boolean = false;
  hoveredMobile :boolean = false;

  constructor() { }
  ngOnInit() {
  }
}
