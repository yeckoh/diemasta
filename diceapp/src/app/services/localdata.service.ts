import { Injectable, HostListener } from '@angular/core';
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


export class LocaldataService {

  constructor(private ws: WsService, private alohasnackbar: MatSnackBar) { }





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





  textinput = '';
  quickslots = ['', '', '', '', '', '', '', ''];
  mytextinput = ''; // personal rolls tab
  current_user = 'someone';
  expanddong = false;
  selected_index = 0; // for opening closing

  CRIT: boolean = false;
  DOUBLES: boolean = true;
  EXPLOSION: boolean = true;

  people: person[] = [];
  oldname: string;

  quickmath: string = '2+2';


  evaluayt() {
    let ddd;
    try {
      ddd = evaluate(this.quickmath);
    }
    catch(SyntaxError) {
      ddd = Number.NaN;
    }
    finally {
      return ddd;
    }
  }



  // ==========================================
  //  SPELLPOINTS =============================
  // ==========================================

  // spellpoint vars
  selected_class = 'fullcast';
  lvl = 0;
  calclvl = 0;
  currentpoints = 0;
  maxpoints = 0;
  dailies = [0, 0, 0, 0];
  cost = [0, 2, 3, 5, 6, 7, 9, 10, 11, 13];
  lvlToPoints = [0, 4, 6, 14, 17, 27, 32, 38, 44, 57, 64, 73, 73, 83, 83, 94, 94, 107, 114, 123, 133];
  reee = 0;
  manualaddsubtract = 0;
  maxspell = 0;

  has_reeed: boolean = false;
  showpercent: boolean = true;
  overlimit: boolean = false;
  sorcmulti = 2;

  calcspellpoints() {
    console.log(this.selected_class);
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
      console.log('oof!');
    }

    this.calclvl = Math.floor(this.calclvl);
    this.maxpoints = this.lvlToPoints[this.calclvl];
    if (this.selected_class === 'sorc') {
      this.maxpoints += this.lvl * this.sorcmulti;
    }

    this.maxspell = (this.calclvl + 1) / 2;
    if (this.maxspell >= 10) {
        this.maxspell = 9;
    }

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
    // this.people[this.people.findIndex(s => s === this.oldname)] = this.current_user;
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
      textinput: this.textinput,
      quickslots: this.quickslots,
      current_user: this.current_user,
      selected_color: this.selected_color,
      expanddong: this.expanddong,
      CRIT: this.CRIT,
      DOUBLES: this.DOUBLES,
      EXPLOSION: this.EXPLOSION
    };
    localStorage.setItem('settings', JSON.stringify(settings));
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
    // if (this.textinput !== '') {
    //   this.newroll();
    // }
    // this.textinput = this.things[this.selected_index].str;
    if (this.textinput !== '') {
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
    this.things.unshift(new Statement(this.textinput));
    this.rollme();
  }

  rollme() {

    this.separatedby_plusminus.length = 0;
    this.plusminus_onlys.length = 0;

    const entry: Statement = this.things[0];
    entry.owner = this.current_user;

    // COLOR TESTING
    entry.color = this.colors[this.selected_color];
    entry.crit = this.CRIT;
    entry.doubles = this.DOUBLES;
    entry.explosions = this.EXPLOSION;

    // let myReg = RegExp('\\+\\d*d\\d+|\\-\\d*d\\d+', 'g');
    let diceReg = RegExp('\\d+', 'g');
    const entrystr = '+'.concat(entry.str);
    let split = entrystr.match(this.myReg);
    let addendum = entrystr.split(this.myReg);
    let results = [];
    for (let i = 0;i < split.length;++i) {
      let totalmod = 0;
      let sidecount = split[i].match(diceReg);
      if (sidecount.length === 1)
        sidecount.unshift('1');
      if (entry.crit && !entry.doubles)
        totalmod = +sidecount[0] * +sidecount[1];

      // let sdgfnjuk = evaluate(this.calculate(+sidecount[0], +sidecount[1], entry) + totalmod + addendum[i+1] + '');
      // console.log(sdgfnjuk);
      // results.push(evaluate(this.calculate(+sidecount[0], +sidecount[1], entry) + totalmod + evaluate(0+addendum[i+1]) + ''));
      // results.push(sdgfnjuk);
      totalmod += evaluate(0+addendum[i+1]);
      results.push(evaluate(this.calculate(+sidecount[0], +sidecount[1], entry) + totalmod + addendum[i+1] + ''));
      if (split[i].startsWith('-', 0))
        results[results.length-1] *= -1;
      if (addendum[i+1] !== '') {
        entry.rollhistory[entry.rollhistory.length-2] += '\xa0\xa0∎ ' + addendum[i+1];
        if (totalmod >= 0)
          entry.rollhistory[entry.rollhistory.length-1] = '+' + totalmod + '\xa0\xa0' + entry.rollhistory[entry.rollhistory.length-1];
        else
        entry.rollhistory[entry.rollhistory.length-1] = totalmod + '\xa0\xa0' + entry.rollhistory[entry.rollhistory.length-1];
      }
    }
    results.forEach(e => {
      entry.result += +e;
    });


    // return;
    // this.separatedby_plusminus = entry.str.split(this.PLUSMINUS);
    // this.plusminus_onlys.push('+');
    // [...entry.str].forEach(c => {
    //   if (c === '+' || c === '-') {
    //     this.plusminus_onlys.push(c);
    //   }
    // });

    // let tempmod = 0;
    // let count = 1;
    // let sides = 0;
    // let timesN1 = false;
    // let splitter = [];
    // let value = 0;

    // this.separatedby_plusminus.forEach(s => {
    //   if (s.includes('d')) { // 5d6
    //     if (tempmod !== 0) {
    //       if (tempmod > 0) {
    //         entry.rollhistory[entry.rollhistory.length - 1] += '\xa0\xa0' + '+' + tempmod;
    //       } else {
    //         entry.rollhistory[entry.rollhistory.length - 1] += '\xa0\xa0' + tempmod;
    //       }
    //     }
    //     if (value !== 0) {
    //       entry.rollhistory[entry.rollhistory.length - 1] += '\xa0\xa0\xa0\xa0∎ ' + (value + tempmod);
    //     }
    //     splitter = s.split('d'); // [5]d[6]
    //     if (splitter[0] !== '') { // if [5]d
    //       count = +splitter[0];
    //     }
    //     if (splitter[1] !== '') { // if d[6]
    //       sides = +splitter[1];
    //     }
    //     if (this.CRIT) {
    //       if (this.DOUBLES) {
    //         count *= 2;
    //       } else { // is max
    //         entry.result += count * sides;
    //       }
    //     } // endof.crits

    //     if (timesN1) {
    //       tempmod *= -1;
    //     }
    //     // entry.result += tempmod;
    //     entry.mod += tempmod; // replacement del if reverting

    //     tempmod = 0;
    //     value = this.calculate(count, sides, entry);
    //     if (this.plusminus_onlys[0] === '-') {
    //       timesN1 = true;
    //       value *= -1;
    //     } else {
    //       timesN1 = false;
    //     }
    //     entry.result += value;
    //     // endof. it was a d
    //   } else { // 56
    //     if (this.plusminus_onlys[0] === '-') {
    //       tempmod -= +s;
    //     } else {
    //       tempmod += +s;
    //     }
    //   } // end.of it was a modifier
    //   this.plusminus_onlys.shift();
    // });
    // if (timesN1) {
    //   // entry.result -= tempmod;
    //   entry.mod -= tempmod;
    // } else {
    //   // entry.result += tempmod;
    //   entry.mod += tempmod;
    // }

    // if (tempmod !== 0) {
    //   if (tempmod > 0) {
    //     entry.rollhistory[entry.rollhistory.length - 1] += '\xa0\xa0' + '+' + tempmod;
    //   } else {
    //     entry.rollhistory[entry.rollhistory.length - 1] += '\xa0\xa0' + tempmod;
    //   }
    // }
    // entry.rollhistory[entry.rollhistory.length - 1] += '\xa0\xa0\xa0\xa0∎ ' + (value + tempmod);

    // entry.result += tempmod; // replaced del if reverting

    // // console.log(entry);
    this.ws.sendback('Create_one_statement', entry);
  }



  calculate(c: number, s: number, e: Statement) {
    let returnval = 0;
    // console.log('calc count: ', c);
    // console.log('calc sides: ', s);
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
    // console.log('calc result: ', returnval);
    // e.rollhistory[e.rollhistory.length - 1] += '\xa0\xa0\xa0\xa0| ' + returnval + '\xa0\xa0\xa0\xa0½| ' + (returnval / 2);
    return returnval;
  }








}
