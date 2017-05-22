import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import { Router, ActivatedRoute, Params, RoutesRecognized, NavigationEnd } from '@angular/router';
import { UserService } from './UserService'

@Injectable()
export class MenuService {

  baseUrl: string;
  rubyServerUrl: string;

  classes: Array<object>;

  menu: Array<object>;
  selectedClassIndex: number;
  selectedMenu: string;

  loginMenu: Array<object>;
  mainMenu: Array<object>;

  loaded: Promise<any>;

  constructor(private http: Http, private router: Router, private userService: UserService) {
    console.log('MenuService Initialized...');
    this.baseUrl = "http://localhost:10010/api/v1";
    this.rubyServerUrl = 'http://localhost:4567'
    this.loginMenu = [
      {
        "name": "Classroom",
        "header": {
          "login": {
            'router': '/login',
            'name': 'Login'
          }
        }
      }
    ]
    this.menu = this.loginMenu;
    this.selectedClassIndex = 0;
    this.selectedMenu = this.loginMenu[0]['header']['login'];
  }

  logout() {
    this.menu = this.loginMenu;
    this.selectedMenu = this.loginMenu[0]['header']['login'];
  }

  init(menu: string) {
    let classesRequest = this.get('/classes')
    this.loaded = new Promise((resolve, reject) => {
      classesRequest.subscribe(res => {
        this.classes = res.json();
        this.mainMenu = this.classes.map((item) => {
          return {
            name: item['name'],
            description: item['description'],
            url: item['web_url'],
            id: item['id'],
            loaded: false,
            header: {
              notification: {
                router: '/notification',
                name: 'Notification'
              },
              assignment: {
                router: '/assignment',
                name: 'Assignment'
              },
              material: {
                router: '/material',
                name: 'Material'
              },
              member: {
                router: '/member',
                name: 'Member'
              }
            }
          }
        })
        this.menu = this.mainMenu;
        if (this.menu.length > 0) {
          this.selectedClassIndex = 0;
        }
        if (menu) {
          this.selectedMenu = this.menu[this.selectedClassIndex]['header'][menu];
        }
        resolve();
      });
    });
    
  }

  selectCourse(index: number) {
    this.selectedClassIndex = index;
    this.navigateMenu('notification');
  }

  selectMenu(menu: string) {
    console.log(`select menu ${menu}`)
    console.log("Menu:", this.menu);
    this.selectedMenu = this.menu[this.selectedClassIndex]['header'][menu];
  }

  navigateMenu(menu: string) {
    console.log(`navigated to menu ${menu}`)
    this.selectMenu(menu);
    this.router.navigate([this.selectedMenu['router'], {class: this.selectedClassIndex}]);    
  }

  get(url: string) {
    let headers = new Headers();
    headers.append('token', this.userService.token);
    return this.http.get(this.baseUrl + url, {headers: headers});
  }

  post(url: string, data: object) {
    let headers = new Headers();
    headers.append('token', this.userService.token);
    return this.http.post(this.baseUrl + url, data, {headers: headers});
  }

}
