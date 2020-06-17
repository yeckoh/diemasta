import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Statement } from './models/statement.model';
import { WsService } from './services/ws.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocaldataService, person } from './services/localdata.service';
// import { MaininterfaceComponent } from './maininterface/maininterface.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // title = 'material';
  constructor(private ws: WsService, public ldata: LocaldataService, private alohasnackbar: MatSnackBar) { }

// tslint:disable: class-name
// tslint:disable: variable-name


  private subscriptions: Subscription;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.ws.disconnect();
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    this.ldata.updatelocalstorage();
    this.ws.sendback('Remove_person', this.ldata.current_user);
  }


  ngOnInit() {
    this.ldata.EXPLOSION = true;
    this.ldata.DOUBLES = true;

    this.subscriptions = (this.ws.listenfor('Read_last').subscribe(data => {
      // data is statement[]
      this.ldata.things = data as Statement[];
    }));

    this.subscriptions.add(this.ws.listenfor('Created_one_statement').subscribe(data => {
      // data is statement
      this.ldata.things.unshift(data as Statement);
    }));

    this.subscriptions.add(this.ws.listenfor('Created_my_statement').subscribe(data => {
      // data is statementid
      this.ldata.things[0]._id = data as string;
    }));

    this.subscriptions.add(this.ws.listenfor('Deleted_one_statement').subscribe(data => {
      // data is statementid
      // this.ldata.things = this.ldata.things.filter(s => s._id !== data);
      this.ldata.things.splice(this.ldata.things.findIndex(s => s._id === data), 1);
      if (this.ldata.things.length - 1 < this.ldata.selected_index) {
        --this.ldata.selected_index;
      }
    }));

    this.subscriptions.add(this.ws.listenfor('Expanded_one_statement').subscribe(data => {
      // data is ._id .expansion
      if (this.ldata.expanddong) {
        class idex {
          _id: string;
          expansion: boolean;
        }
        const x = data as idex;
        this.ldata.things.find(s => s._id === x._id).expand = x.expansion;
      }
    }));

    this.subscriptions.add(this.ws.listenfor('Read_people').subscribe(data => {
      // data is ._id .expansion
      this.ldata.people = data as person[];
    }));

    this.ws.sendback('Get_last', null);

    const settings = JSON.parse(localStorage.getItem('settings'));
    const pp = {name: 'someone', color: 0};
    if (settings === null) {
      this.ws.sendback('Add_person', pp);
      return;
    }
    this.ldata.statementinput = settings.statementinput;
    this.ldata.quickslots = settings.quickslots;
    this.ldata.current_user = settings.current_user;
    this.ldata.selected_color = settings.selected_color;
    this.ldata.expanddong = settings.expanddong;
    this.ldata.CRIT = settings.CRIT;
    this.ldata.DOUBLES = settings.DOUBLES;
    this.ldata.EXPLOSION = settings.EXPLOSION;

    pp.color = this.ldata.selected_color;
    pp.name = this.ldata.current_user;
    this.ldata.people.push(pp);
    this.ws.sendback('Add_person', pp);
    // this.ldata.people.push(this.ldata.current_user);
    // this.ws.sendback('Add_person', this.ldata.current_user);
  }

}
