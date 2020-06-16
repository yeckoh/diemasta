import { Component, OnInit } from '@angular/core';
import { LocaldataService } from '../services/localdata.service';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-storydice',
  templateUrl: './storydice.component.html',
  styleUrls: ['./storydice.component.scss']
})
export class StorydiceComponent implements OnInit {

  constructor(protected ldata: LocaldataService, ws : WsService) { }

  // tslint:disable: class-name
  // tslint:disable: variable-name
  // tslint:disable: max-line-length
  // tslint:disable: no-inferrable-types
  // tslint:disable: curly
  // tslint:disable: no-switch-case-fall-through


  // results
  r_advantage = 0;
  r_threat = 0;

  r_success = 0;
  r_failiure = 0;

  r_triumph = 0;
  r_despair = 0;

  // difficulty
  d_difficulty = 3; // purple d8
  d_challenge = 1; // red d12

  // player attempt
  d_ability = 2; // green d8
  d_prof = 1; // yellow d12

  // circumstantial
  d_boost = 0; // white d6
  d_setback = 0; // black d6


  difficulty = [0, 1, 2, 3, 4, 5];

  // subscriptions
  // ondestroy

  ngOnInit(): void {
    // subscriptions =
    // subscriptions.add
  }


  // difficulty
  rolldifficulty() {
    if (this.d_difficulty <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.d_difficulty; ++i) {
      roll = Math.floor(Math.random() * 8) + 1;
      switch (roll) {
        case 1:
        case 4:
        case 8:
          ++this.r_threat;
          break;
        case 2:
          ++this.r_failiure;
          break;
        case 3:
          ++this.r_failiure;
          ++this.r_threat;
          break;
        case 5:
          break;
        case 7:
          this.r_threat += 2;
          break;
        case 6:
          this.r_failiure += 2;
          break;
      }
    }
  }

  rollchallenge() {
    if (this.d_challenge <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.d_challenge; ++i) {
      roll = Math.floor(Math.random() * 8) + 1;
      switch (roll) {
        case 1:
          break;
        case 2:
        case 4:
          this.r_failiure += 2;
          break;
        case 3:
          ++this.r_despair;
          break;
        case 5:
        case 7:
          ++this.r_failiure;
          break;
        case 6:
        case 8:
          ++this.r_failiure;
          ++this.r_threat;
          break;
        case 9:
        case 11:
          ++this.r_threat;
          break;
        case 10:
        case 12:
          this.r_threat += 2;
          break;
      }
    }
  }


  // player attempt
  rollability() {
    if (this.d_ability <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.d_ability; ++i) {
      roll = Math.floor(Math.random() * 8) + 1;
      switch (roll) {
        case 1:
          break;
        case 2:
          this.r_advantage += 2;
          break;
        case 3:
        case 8:
          ++this.r_success;
          break;
        case 4:
        case 7:
          ++this.r_advantage;
          break;
        case 5:
          this.r_success += 2;
          break;
        case 6:
          ++this.r_advantage;
          ++this.r_success;
          break;
      }
    }
  }

  rollprof() {
    if (this.d_prof <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.d_prof; ++i) {
      roll = Math.floor(Math.random() * 12) + 1;
      switch (roll) {
        case 1:
          break;
        case 2:
        case 4:
          this.r_success += 2;
          break;
        case 3:
        case 5:
        case 7:
          ++this.r_success;
          ++this.r_advantage;
          break;
        case 6:
        case 8:
          ++this.r_success;
          break;
        case 9:
          ++this.r_triumph;
          break;
        case 10:
        case 12:
          this.r_advantage += 2;
          break;
        case 11:
          ++this.r_advantage;
          break;
      }
    }
  }

  // ++this.r_advantage;
  // ++this.r_success;
  // this.r_advantage += 2;

  // circumstantial
  rollboost() {
    if (this.d_boost <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.d_boost; ++i) {
      roll = Math.floor(Math.random() * 6) + 1;
      switch (roll) {
        case 1:
          ++this.r_success;
          break;
        case 2:
          this.r_advantage += 2;
          break;
        case 3:
          ++this.r_advantage;
          ++this.r_success;
          break;
        case 4:
        case 5:
          break;
        case 6:
          ++this.r_advantage;
          break;
      }
    }
  }

  // ++this.r_failiure;
  // ++this.r_threat;

  rollsetback() {
    if (this.d_setback <= 0)
      return;
    let roll = 0;

    for (let i = 0; i < this.d_setback; ++i) {
      roll = Math.floor(Math.random() * 6) + 1;
      switch (roll) {
        case 1:
        case 4:
          ++this.r_failiure;
          break;
        case 2:
        case 5:
          ++this.r_threat;
          break;
        case 3:
        case 6:
          break;
      }
    }
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
    this.r_advantage = 0;
    this.r_success = 0;
    this.r_triumph = 0;
  }

  resetdc() {
    this.r_despair = 0;
    this.r_failiure = 0;
    this.r_threat = 0;
  }

  resetall() {
    this.r_advantage = 0;
    this.r_threat = 0;

    this.r_success = 0;
    this.r_failiure = 0;

    this.r_triumph = 0;
    this.r_despair = 0;

    // difficulty
    this.d_difficulty = 0; // purple d8
    this.d_challenge = 0; // red d12

    // player attempt
    this.d_ability = 0; // green d8
    this.d_prof = 0; // yellow d12

    // circumstantial
    this.d_boost = 0; // white d6
    this.d_setback = 0; // black d6
  }


}
