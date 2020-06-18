export class Fantasy {

    // tslint:disable: variable-name
    _id: string;
    r_advantage = 0;
    r_threat = 0;
  
    // results
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
  
    constructor() {
      // name: this.textname,
    }
  
  }
  