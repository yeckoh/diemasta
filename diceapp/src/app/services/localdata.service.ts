import { Injectable, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Statement } from '../models/statement.model';
import { WsService } from '../services/ws.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import evaluate, { registerFunction } from 'ts-expression-evaluator';

export interface person {
  name: string;
  color: number;
}

@Injectable({
  providedIn: 'root'
})

  // tslint:disable: class-name
  // tslint:disable: variable-name
  // tslint:disable: max-line-length
  // tslint:disable: no-inferrable-types
  // tslint:disable: curly
  // tslint:disable: member-ordering


export class LocaldataService implements OnDestroy, OnInit {

  constructor(private ws: WsService, private alohasnackbar: MatSnackBar) {}
  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }





  // textname: string;
  // textinit: number;
  colors = ['firebrick', 'tomato', 'goldenrod', 'darkorange', 'limegreen', 'forestgreen', 'mediumseagreen', 'olivedrab', 'lightseagreen', 'teal', 'dodgerblue', 'steelblue', 'darkslateblue', 'orchid', 'blueviolet', 'deeppink', 'dimgray', 'saddlebrown', 'maroon', 'black'];
  selected_color = 0;




  // public readonly PLUSMINUS = RegExp('[+-]');
  // public readonly Regex = RegExp('[^d\\d+-]');
  public readonly myReg = RegExp('\\+\\d*d\\d+|\\-\\d*d\\d+', 'g');

  things: Array<Statement> = new Array<Statement>();
  separatedby_plusminus: Array<string> = new Array<string>();
  plusminus_onlys: Array<string> = new Array<string>();

  mythings: Array<Statement> = new Array<Statement>();





  statementinput = '';
  quickslots = ['', '', '', '', '', '', '', ''];
  mystatementinput = ''; // personal rolls tab
  current_user = 'someone';
  expanddong = false;
  selected_index = 0; // for opening closing

  CRIT: boolean = false;
  DOUBLES: boolean = true;
  EXPLOSION: boolean = true;

  people: person[] = [];
  oldname: string;

  quickmath: string = '2+2/3.57';

  displaygroups = [];

  updateDisplayGroups() {
    const entrystr = '+'.concat(this.statementinput);
    this.displaygroups = entrystr.match(this.myReg);
  }

  evaluayt() {
    let ddd;
    try {
      ddd = evaluate(this.quickmath);
    }
    catch(SyntaxError) {
      ddd = Number.POSITIVE_INFINITY;
    }
    finally {
      return ddd;
    }
  }

  testfunc() {
    this.quickmath = '5+5';
    this.evaluayt();
  }


  // ==========================================
  //  SPELLPOINTS =============================
  // ==========================================

  // spellpoint vars
  selected_class = 'fullcast';
  lvl: number = 0;
  calclvl = 0;
  currentpoints = 0;
  maxpoints = 0;
  dailies = [0, 0, 0, 0];
  // maxdailies = [1, 1, 1, 1];
  max6th = 1;
  max7th = 1;
  max8th = 1;
  max9th = 1;
  cost = [0, 2, 3, 5, 6, 7, 9, 10, 11, 13];
  lvlToPoints = [0, 4, 6, 14, 17, 27, 32, 38, 44, 57, 64, 73, 73, 83, 83, 94, 94, 107, 114, 123, 133];
  reee = 0;
  manualaddsubtract = 0;
  maxspell = 0;
  currentcost = 0;

  has_reeed: boolean = false;
  showpercent: boolean = true;
  overlimit: boolean = false;
  sorcmulti = 2;

  calcspellpoints() {
    // console.log(this.selected_class);
    switch(this.selected_class) {
      case 'fullcast': // fullcaster
      case 'sorc': // src
      case 'wiz':
        this.calclvl = this.lvl;
        break; // wiz
      case 'halfcast':
        this.calclvl = Math.floor((+this.lvl + 1) / 2);
        console.log('lvl ', this.lvl);
        console.log('halfcast calclvl ', this.calclvl);
        break;
      case 'thirdcast':
        this.calclvl = Math.floor((+this.lvl + 2) / 3);
        console.log('thirdcast calclvl ', this.calclvl);
        break;
      default:
      console.log('Oof!');
    }

    this.calclvl = Math.floor(this.calclvl);
    this.maxpoints = this.lvlToPoints[this.calclvl];
    if (this.selected_class === 'sorc') {
      this.maxpoints += this.lvl * this.sorcmulti;
    }

    this.maxspell = Math.floor((this.calclvl + 1) / 2);
    if (this.maxspell >= 10) {
        this.maxspell = 9;
    }
    this.dailies = [0, 0, 0, 0];
    switch (this.maxspell) {
      case 9:
        this.dailies[3] = this.max9th;
      case 8:
        this.dailies[2] = this.max8th;
      case 7:
        this.dailies[1] = this.max7th;
      case 6:
        this.dailies[0] = this.max6th;
    }
    this.currentpoints = this.maxpoints;
  }


  addsubtractpoints() {
    if (this.manualaddsubtract === undefined)
      return;
    this.currentpoints += +this.manualaddsubtract;
    if (!this.overlimit) {
      if (this.currentpoints > this.maxpoints)
        this.currentpoints = this.maxpoints;
    }
    if (this.currentpoints < 0)
      this.currentpoints = 0;
  }


  // ==========================================
  //  SPELLPOINTS =============================
  // ==========================================

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.updatelocalstorage();
    this.ws.sendback('Remove_person', this.current_user);
  }


  namechange() {
    const pp = {
      old: this.oldname,
      new: this.current_user
    };
    this.ws.sendback('Update_person', pp);
  }

  colorchange() {
    const pp = {
      name: this.current_user,
      color: this.selected_color
    };
    this.ws.sendback('Update_personcolor', pp);
  }

  updatelocalstorage() {
    const settings = {
      statementinput: this.statementinput,
      quickslots: this.quickslots,
      current_user: this.current_user,
      selected_color: this.selected_color,
      expanddong: this.expanddong,
      CRIT: this.CRIT,
      DOUBLES: this.DOUBLES,
      EXPLOSION: this.EXPLOSION
    };
    localStorage.setItem('settings', JSON.stringify(settings));

    const spellpoints = {
      selected_class: this.selected_class,
      lvl: this.lvl as number,
      calclvl: this.calclvl,
      currentpoints: this.currentpoints,
      maxpoints: this.maxpoints,
      dailies: this.dailies,
      reee: this.reee,
      manualaddsubtract: this.manualaddsubtract,
      maxspell: this.maxspell,
      currentcost: 0,
    
      has_reeed: this.has_reeed,
      showpercent: this.showpercent,
      overlimit: this.overlimit,
      sorcmulti: this.sorcmulti,
      maxdailies: [this.max6th, this.max7th, this.max8th, this.max9th]
    };
    localStorage.setItem('spellpoints', JSON.stringify(spellpoints));
  }

  shrinkall() {
    this.things.forEach(s => s.expand = false);
  }

  expandroll(roll) {
    // this.selected_roll = roll;
    this.selected_index = this.things.findIndex(r => r === roll);
    if (this.expanddong) {
      this.ws.sendback('Expand_one_statement', {_id: roll._id, expansion: roll.expand});
    }
  }

  deleteroll(roll) {
    this.ws.sendback('Delete_one_statement', roll);
    this.things.splice(this.things.findIndex(r => r === roll), 1);
    if (this.things.length - 1 < this.selected_index) {
      --this.selected_index;
    }
  }

  deletemyroll(roll) {
    this.mythings.splice(this.mythings.findIndex(r => r === roll), 1);
  }

  // ==========================================
  //  KEY FUNCS ===============================
  // ==========================================

  onEnterKey() { // roll statement
    // if (this.statementinput !== '') {
    //   this.newroll();
    // }
    // this.statementinput = this.things[this.selected_index].str;
    if (this.statementinput !== '') {
      this.newroll();
      this.onDownKey();
    }
  }

  onUpKey() { // move up index
    if (this.selected_index > 0) {
      --this.selected_index;
    }
  }

  onDownKey() { // move down index
    if (this.selected_index < this.things.length - 1) {
      ++this.selected_index;
    }
  }

  onRightKey() { // call expansion
    if (this.things[this.selected_index] !== undefined) {
      this.things[this.selected_index].expand = true;
      this.expandroll(this.things[this.selected_index]);
    }
  }

  onLeftKey() { // call shrink
    if (this.things[this.selected_index] !== undefined) {
      this.things[this.selected_index].expand = false;
      this.expandroll(this.things[this.selected_index]);
  }
}

  // ==========================================
  //  ROLLING FUNCS ===========================
  // ==========================================

  newroll() {
    this.things.unshift(new Statement(this.statementinput));
    this.rollme();
  }

  rollme() {

    const entry: Statement = this.things[0];
    entry.owner = this.current_user;

    // COLOR TESTING
    entry.color = this.colors[this.selected_color];
    entry.crit = this.CRIT;
    entry.doubles = this.DOUBLES;
    entry.explosions = this.EXPLOSION;

    let diceReg = RegExp('\\d+', 'g');
    const entrystr = '+'.concat(entry.str);
    let split = entrystr.match(this.myReg);
    
    if (split === null) {
      entry.str = 'Oof!';
      entry.rollhistory[0] = ': NaN';
      entry.result = Number.POSITIVE_INFINITY;
      this.ws.sendback('Create_one_statement', entry);
      return;
    }

    let addendum = entrystr.split(this.myReg);
    let results = [];
    for (let i = 0;i < split.length;++i) {
      let totalmod = 0;
      let sidecount = split[i].match(diceReg);
      if (sidecount.length === 1)
        sidecount.unshift('1');
      if (entry.crit && !entry.doubles)
        totalmod = +sidecount[0] * +sidecount[1];

      totalmod += evaluate(0+addendum[i+1]);
      results.push(evaluate(this.calculate(+sidecount[0], +sidecount[1], entry) + totalmod + addendum[i+1] + ''));
      if (split[i].startsWith('-', 0))
        results[results.length-1] *= -1;
      if (addendum[i+1] !== '') {
        entry.rollhistory[entry.rollhistory.length-2] += '\xa0\xa0' + addendum[i+1];
        if (totalmod >= 0)
          entry.rollhistory[entry.rollhistory.length-1] = '+' + totalmod + '\xa0\xa0' + entry.rollhistory[entry.rollhistory.length-1];
        else
        entry.rollhistory[entry.rollhistory.length-1] = totalmod + '\xa0\xa0' + entry.rollhistory[entry.rollhistory.length-1];
      }
    }

    results.forEach(e => {
      entry.result += +e;
    });
    console.log(entry.result);
    if (isNaN(entry.result))
      entry.result = Number.POSITIVE_INFINITY;
    this.ws.sendback('Create_one_statement', entry);
  }



  calculate(c: number, s: number, e: Statement) {
    let returnval = 0;
    let poormansescape = 0;

    e.rollhistory.push(': ' + c + 'd' + s);
    e.rollhistory.push('⇀ ');
    let roll = 0;
    if (this.CRIT) {
      if (this.DOUBLES) {
        c *= 2;
      // } else { // is max
      //   e.result += c * s;
      }
    }
    if (this.CRIT) {
      for (let i = 0; i < c; ++i) {
        roll = Math.floor(Math.random() * s) + 1;
        if ( this.EXPLOSION && roll === s) {
          if(++poormansescape > 1000000)
            break;
          // console.log('EXPLOOOOOOOOOOSION');
          --i;
        }
        // e.rollhistory.push(roll);
        e.rollhistory[e.rollhistory.length - 1] += roll + ' ';
        returnval += roll;
      }
    } else { // noncrit
      for (let i = 0; i < c; ++i) {
        roll = Math.floor(Math.random() * s) + 1;
        // e.rollhistory.push(roll);
        e.rollhistory[e.rollhistory.length - 1] += roll + ' ';
        returnval += roll;
      }
    }
    return returnval;
  }








}
