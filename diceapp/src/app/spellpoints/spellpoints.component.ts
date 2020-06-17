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
  }

  cost = 0;
  




}
