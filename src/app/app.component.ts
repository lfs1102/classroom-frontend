import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';

import { MenuService } from './services/MenuService'
import { UserService } from './services/UserService'

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    providers: [MenuService, UserService]
})
export class AppComponent {

    constructor(private router: Router, private route: ActivatedRoute, private http: Http, private menuService: MenuService, private userService: UserService) {
        console.log(router.url);
        router.events.subscribe(e => {
            if (e instanceof RoutesRecognized) {
                let currentRoute = e.state.root.firstChild;
                console.log(currentRoute);
                if (userService.token) {
                    if (menuService.mainMenu) {
                        menuService.selectMenu(currentRoute.url[0].path);
                    } else {
                        menuService.init(currentRoute.url[0].path);
                    }
                } else if (currentRoute.url[0].path != 'login') {
                    router.navigate(['/login']);
                }
            }
        })
    }

    switchCourse(index: number) {
        this.menuService.selectCourse(index);
    }

    logout() {
        this.userService.username = null;
        this.userService.token = null;
        this.menuService.logout();
        this.router.navigate(['/login']);
    }
}
