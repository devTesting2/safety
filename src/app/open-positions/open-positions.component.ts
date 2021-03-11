import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionData } from '../_models/PositionData';
import { CommunicationService } from '../_services/communication.service';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['./open-positions.component.css']
})
export class OpenPositionsComponent implements OnInit {

  positionData: PositionData;
  localStorageLang : string;

  constructor(private router: Router, private communicationService: CommunicationService) {

    this.communicationService.content.subscribe(lang =>{
      this.loadPositions();
    });
  }

  ngOnInit() {
  }

  loadPositions(){

    if(localStorage.getItem('language') === 'en')
    {
      this.positionData = require('../../assets/positionsdataEn.json');
    }
    else
    {
      this.positionData = require('../../assets/positionsdataBh.json');
    }
  }

  openPosition(id: number){
    
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/position',id])
    );
    window.open(url,'_blank');
  }
}
