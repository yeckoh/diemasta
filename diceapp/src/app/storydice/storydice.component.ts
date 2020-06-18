import { Component, OnInit } from '@angular/core';
import { LocaldataService } from '../services/localdata.service';
import { WsService } from '../services/ws.service';
import { Subscription } from 'rxjs';
import { Fantasy } from '../models/fantasy.model';


export interface difficultydata {
  difflvl: string;
  tooltip: string;
  pos: number;
}


@Component({
  selector: 'app-storydice',
  templateUrl: './storydice.component.html',
  styleUrls: ['./storydice.component.scss']
})
export class StorydiceComponent implements OnInit {

  constructor(protected ldata: LocaldataService, private ws : WsService) { }

  // tslint:disable: class-name
  // tslint:disable: variable-name
  // tslint:disable: max-line-length
  // tslint:disable: no-inferrable-types
  // tslint:disable: curly
  // tslint:disable: no-switch-case-fall-through

  difficultytable: difficultydata[];
  displayedColumns: string[] = ['pos', 'difflvl', 'tooltip'];
  finalFantasy: Fantasy = new Fantasy();

  // results
  // r_advantage = 0;
  // r_threat = 0;

  // r_success = 0;
  // r_failiure = 0;

  // r_triumph = 0;
  // r_despair = 0;

  // // difficulty
  // d_difficulty = 3; // purple d8
  // d_challenge = 1; // red d12

  // // player attempt
  // d_ability = 2; // green d8
  // d_prof = 1; // yellow d12

  // // circumstantial
  // d_boost = 0; // white d6
  // d_setback = 0; // black d6


  // difficulty = [0, 1, 2, 3, 4, 5];

  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    // this.ws.disconnect();
  }

  ngOnInit(): void {
    this.difficultytable = [
      {difflvl:'ez', tooltip:'ok', pos: 1},
      {difflvl:'average', tooltip:'okay', pos: 2},
      {difflvl:'hard', tooltip:'Okay', pos: 3},
      {difflvl:'daunting', tooltip:'OKAY', pos: 4},
      {difflvl:'impossib', tooltip:'Oof', pos: 5},
    ];

    this.subscriptions = (this.ws.listenfor('Created_fantasy').subscribe(data => {
      // data is a Fantasy
      // console.log('initialized fantasy');
      this.finalFantasy = data as Fantasy;
    }));

    this.subscriptions = (this.ws.listenfor('Read_fantasy').subscribe(data => {
      // data is a Fantasy
      // console.log('read fantasy');
      // console.log(data);
      if ((data as []).length === 0) {
        console.log('there was no fantasy');
        this.ws.sendback('Create_one_fantasy', null);
      }
      this.finalFantasy = data as Fantasy;
      // console.log(this.finalFantasy);
    }));

    this.subscriptions.add(this.ws.listenfor('Updated_fantasy').subscribe(data => {
      // data is a Fantasy
      console.log('updated fantasy');
      this.finalFantasy = data as Fantasy;
    }));

    this.ws.sendback('Get_fantasy', null);    
  }

  changeAmount() {
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }

  // difficulty
  rolldifficulty() {
    if (this.finalFantasy.d_difficulty <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.finalFantasy.d_difficulty; ++i) {
      roll = Math.floor(Math.random() * 8) + 1;
      switch (roll) {
        case 1:
        case 4:
        case 8:
          ++this.finalFantasy.r_threat;
          break;
        case 2:
          ++this.finalFantasy.r_failiure;
          break;
        case 3:
          ++this.finalFantasy.r_failiure;
          ++this.finalFantasy.r_threat;
          break;
        case 5:
          break;
        case 7:
          this.finalFantasy.r_threat += 2;
          break;
        case 6:
          this.finalFantasy.r_failiure += 2;
          break;
      }
    }
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }

  rollchallenge() {
    if (this.finalFantasy.d_challenge <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.finalFantasy.d_challenge; ++i) {
      roll = Math.floor(Math.random() * 8) + 1;
      switch (roll) {
        case 1:
          break;
        case 2:
        case 4:
          this.finalFantasy.r_failiure += 2;
          break;
        case 3:
          ++this.finalFantasy.r_despair;
          break;
        case 5:
        case 7:
          ++this.finalFantasy.r_failiure;
          break;
        case 6:
        case 8:
          ++this.finalFantasy.r_failiure;
          ++this.finalFantasy.r_threat;
          break;
        case 9:
        case 11:
          ++this.finalFantasy.r_threat;
          break;
        case 10:
        case 12:
          this.finalFantasy.r_threat += 2;
          break;
      }
    }
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }


  // player attempt
  rollability() {
    if (this.finalFantasy.d_ability <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.finalFantasy.d_ability; ++i) {
      roll = Math.floor(Math.random() * 8) + 1;
      switch (roll) {
        case 1:
          break;
        case 2:
          this.finalFantasy.r_advantage += 2;
          break;
        case 3:
        case 8:
          ++this.finalFantasy.r_success;
          break;
        case 4:
        case 7:
          ++this.finalFantasy.r_advantage;
          break;
        case 5:
          this.finalFantasy.r_success += 2;
          break;
        case 6:
          ++this.finalFantasy.r_advantage;
          ++this.finalFantasy.r_success;
          break;
      }
    }
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }

  rollprof() {
    if (this.finalFantasy.d_prof <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.finalFantasy.d_prof; ++i) {
      roll = Math.floor(Math.random() * 12) + 1;
      switch (roll) {
        case 1:
          break;
        case 2:
        case 4:
          this.finalFantasy.r_success += 2;
          break;
        case 3:
        case 5:
        case 7:
          ++this.finalFantasy.r_success;
          ++this.finalFantasy.r_advantage;
          break;
        case 6:
        case 8:
          ++this.finalFantasy.r_success;
          break;
        case 9:
          ++this.finalFantasy.r_triumph;
          break;
        case 10:
        case 12:
          this.finalFantasy.r_advantage += 2;
          break;
        case 11:
          ++this.finalFantasy.r_advantage;
          break;
      }
    }
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }

  // ++this.r_advantage;
  // ++this.r_success;
  // this.r_advantage += 2;

  // circumstantial
  rollboost() {
    if (this.finalFantasy.d_boost <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.finalFantasy.d_boost; ++i) {
      roll = Math.floor(Math.random() * 6) + 1;
      switch (roll) {
        case 1:
          ++this.finalFantasy.r_success;
          break;
        case 2:
          this.finalFantasy.r_advantage += 2;
          break;
        case 3:
          ++this.finalFantasy.r_advantage;
          ++this.finalFantasy.r_success;
          break;
        case 4:
        case 5:
          break;
        case 6:
          ++this.finalFantasy.r_advantage;
          break;
      }
    }
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }

  // ++this.r_failiure;
  // ++this.r_threat;

  rollsetback() {
    if (this.finalFantasy.d_setback <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.finalFantasy.d_setback; ++i) {
      roll = Math.floor(Math.random() * 6) + 1;
      switch (roll) {
        case 1:
        case 4:
          ++this.finalFantasy.r_failiure;
          break;
        case 2:
        case 5:
          ++this.finalFantasy.r_threat;
          break;
        case 3:
        case 6:
          break;
      }
    }
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }

  rollcheck() {
    this.rollability();
    this.rollboost();
    this.rollprof();
  }

  rolldc() {
    this.rollchallenge();
    this.rolldifficulty();
    this.rollsetback();
  }

  resetcheck() {
    this.finalFantasy.r_advantage = 0;
    this.finalFantasy.r_success = 0;
    this.finalFantasy.r_triumph = 0;
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }

  resetdc() {
    this.finalFantasy.r_despair = 0;
    this.finalFantasy.r_failiure = 0;
    this.finalFantasy.r_threat = 0;
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }

  resetall() {
    this.finalFantasy.r_advantage = 0;
    this.finalFantasy.r_threat = 0;

    this.finalFantasy.r_success = 0;
    this.finalFantasy.r_failiure = 0;

    this.finalFantasy.r_triumph = 0;
    this.finalFantasy.r_despair = 0;

    // difficulty
    this.finalFantasy.d_difficulty = 0; // purple d8
    this.finalFantasy.d_challenge = 0; // red d12

    // player attempt
    this.finalFantasy.d_ability = 0; // green d8
    this.finalFantasy.d_prof = 0; // yellow d12

    // circumstantial
    this.finalFantasy.d_boost = 0; // white d6
    this.finalFantasy.d_setback = 0; // black d6
    this.ws.sendback('Update_fantasy', this.finalFantasy);
  }


}
