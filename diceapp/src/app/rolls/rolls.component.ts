import { Component, OnInit } from '@angular/core';
import { LocaldataService } from 'src/app/services/localdata.service';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.scss']
})
export class RollsComponent implements OnInit {

  constructor(public ldata: LocaldataService) { }

  ngOnInit() {
  }

}
