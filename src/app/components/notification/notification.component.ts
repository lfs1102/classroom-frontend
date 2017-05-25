import { Component } from '@angular/core';
import { MenuService } from '../../services/MenuService'
import { Http } from '@angular/http';

@Component({
    styleUrls: ['notification.component.scss'],
    templateUrl: 'notification.component.html',
})
export class NotificationComponent {

    notifications: Array<object>;
    modelOpen: boolean;
    title: string;
    text: string;

    constructor(private menuService: MenuService, private http: Http) {
        this.modelOpen = false;
        this.loadNotifications();
    }

    loadNotifications() {
       this.menuService.loaded.then(() => {
            this.http.get(this.menuService.rubyServerUrl + `/notification/${this.menuService.selectedClassIndex}`).subscribe((res) => {
                this.notifications = res.json();
            });
        })
    }

    addNotification() {
        this.modelOpen = false;
        this.http.post(this.menuService.rubyServerUrl + `/notification/${this.menuService.selectedClassIndex}`, {
            title: this.title,
            text: this.text,
            time: new Date()
        }).subscribe((res) => {
            this.loadNotifications();
        })
    }
}
