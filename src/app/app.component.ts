import { Component } from '@angular/core';

import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public value: any;
  public optionSelectedFrom: any;
  public optionSelectedTo: any;
  public options: any = ['INR', 'USD','BTC'];
  public val: any;
  public dateVal: any;

  constructor(public appService: AppService) {
    this.appService.getData().subscribe(data => {
      this.dateVal = data.date;
      this.value = data.rates;
      console.log(data);
    })
  }
  title = 'app';

  onOptionsSelectedTo(event) {
    this.val = this.value[event];
  }

  
}
