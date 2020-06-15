export class Statement {

  // tslint:disable: variable-name
  _id: string;
  owner: string;
  color: string;

  str: string;
  result: number;
  mod: number;

  rollhistory: any[];

  crit: boolean;
  explosions: boolean;
  doubles: boolean;
  expand: boolean;

  constructor(i: string) {
    this.str = i;
    this.result = 0;
    this.mod = 0;

    this.owner = '';
    this.color = '';

    this.rollhistory = [];

    this.crit = false;
    this.explosions = false;
    this.doubles = false;
    this.expand = false;
  }


}
