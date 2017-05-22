import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params, RoutesRecognized, NavigationEnd } from '@angular/router';

@Injectable()
export class UserService {

  baseUrl: string;
  username: string;
  token: string;
  error: string;
  userID: string;

  constructor(private http: Http, private router: Router) {
    console.log('UserService Initialized...');
    this.baseUrl = "http://localhost:10010/api/v1";
    this.username = localStorage.getItem("username");
    this.token = localStorage.getItem("token");
    this.userID = localStorage.getItem('userID');
  }

  login(username: string, password: string) {
    console.log(`Try to login with username ${username} and password ${password}.`)
    let result = this.http.get(this.baseUrl + `/session/login?username=${username}&password=${password}`)
    result.subscribe(res => {
        console.log(res.json())
        this.username = username;
        this.token = res.json().token;
        this.userID = res.json().userID;
        this.error = null;
        localStorage.setItem("token", this.token);
        localStorage.setItem("username", this.username);
        localStorage.setItem("userID", this.userID)
    }, error => {
        this.error = error.json().message;
    })
    return result;
  }

}
