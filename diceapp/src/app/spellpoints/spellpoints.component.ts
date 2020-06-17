import { Component, OnInit } from '@angular/core';
import { LocaldataService } from '../services/localdata.service';

@Component({
  selector: 'app-spellpoints',
  templateUrl: './spellpoints.component.html',
  styleUrls: ['./spellpoints.component.scss']
})
export class SpellpointsComponent implements OnInit {

  constructor(public ldata: LocaldataService) { }

  ngOnInit() {
    const spellpoints = JSON.parse(localStorage.getItem('spellpoints'));
    if (spellpoints === null) {
      // do nothing
      console.log('no spellpoints!');
      return;
    }
    // console.log(spellpoints);
    this.ldata.selected_class = spellpoints.selected_class;
    this.ldata.lvl = spellpoints.lvl as number;
    this.ldata.calclvl = spellpoints.calclvl;
    this.ldata.maxpoints = spellpoints.maxpoints;
    this.ldata.dailies = spellpoints.dailies;
    this.ldata.reee = spellpoints.reee;
    this.ldata.manualaddsubtract = spellpoints.manualaddsubtract;
    this.ldata.maxspell = spellpoints.maxspell;
    this.ldata.currentcost = 0;
    // this.ldata.has_reeed = spellpoints.has_reeed;
    this.ldata.showpercent = spellpoints.showpercent;
    this.ldata.overlimit = spellpoints.overlimit;
    this.ldata.sorcmulti = spellpoints.sorcmulti;
    this.ldata.currentpoints = spellpoints.currentpoints;
    this.ldata.max6th = spellpoints.maxdailies[0];
    this.ldata.max7th = spellpoints.maxdailies[1];
    this.ldata.max8th = spellpoints.maxdailies[2];
    this.ldata.max9th = spellpoints.maxdailies[3];
    this.ldata.dailiesspent = spellpoints.dailiesspent;
  }

}
