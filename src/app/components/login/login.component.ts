import { Component } from '@angular/core';
import { MenuService } from '../../services/MenuService'
import { Router } from '@angular/router';
import { UserService } from '../../services/UserService'

@Component({
    styleUrls: ['login.component.scss'],
    templateUrl: 'login.component.html',
})
export class LoginComponent {

    username: string;
    password: string;

    constructor(private router: Router, private userService: UserService,  private menuService: MenuService) {
        if (userService.token && userService.username) {
            this.menuService.init('assignment');
            this.menuService.loaded.then(() => {
                this.menuService.navigateMenu('notification');
            });        
        } else {
            this.username = '13302010002';
            this.password = '12345678';
            // this.login();
        }
    }

    login() {
        this.userService.login(this.username, this.password).subscribe(res => {
            this.menuService.init('assignment');
            this.menuService.loaded.then(() => {
                this.menuService.navigateMenu('notification');
            });
        });
    }
}
