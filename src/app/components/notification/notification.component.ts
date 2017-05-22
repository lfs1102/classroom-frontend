import { Component } from '@angular/core';
import { MenuService } from '../../services/MenuService'

@Component({
    styleUrls: ['notification.component.scss'],
    templateUrl: 'notification.component.html',
})
export class NotificationComponent {

    constructor(private menuService: MenuService) {
        
    }
}
