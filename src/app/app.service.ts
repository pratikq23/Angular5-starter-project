import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AppService {
  private serverUrl = "http://data.fixer.io/api/latest?access_key=b15e0b1d67354200e31572cf60404cc1&symbols=USD,INR,BTC"

  constructor (private http: Http) {}


  getData(): Observable<any> {
      return this.http.get(this.serverUrl)
          .map(this.extractData)
          .catch(this.handleError);
  }  

  sendOtpTpostRequest(mobile: number,otpRequest:any) : Observable<any> {
    let bodyString = {
      mobile_no : mobile
    } // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this.serverUrl+otpRequest, bodyString, options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}