export class Initiative {

  // tslint:disable: variable-name
  _id: string;
  name: string;
  initiative: number;
  tags: string;
  concentrating: boolean;
  prone: boolean;
  dying: boolean;
  roundtime: number;
  abs_pos: number;
  expand: boolean;
  hasGone: boolean;

  constructor(stuff) {
    // name: this.textname,
    //   initiative: this.textinit,
    //   tags: '',
    //   concentrating: false, prone: false, dying: false
    this._id = '';
    this.name = stuff.name;
    this.initiative = stuff.initiative;
    this.tags = '';
    this.concentrating = false;
    this.prone = false;
    this.dying = false;
    this.roundtime = 0;
    this.abs_pos = 0;
    this.expand = false;
    this.hasGone = false;
  }

}
