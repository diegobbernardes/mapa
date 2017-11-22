import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {
  data: any;
  apiUrl = 'http://localhost:3000/events?lat=-30.0392598&lng=-51.2201881&distance=100&sort=venue&accessToken=522478361460627|-1iDGzP0K5ZBL8QriAUzv2cWFBw';
  constructor(public http: Http) {
    console.log('Hello RestapiServiceProvider Provider');
  }
  getEventos() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get(this.apiUrl)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
