import { Component } from '@angular/core';
import { MenuService } from '../../services/MenuService'

@Component({
    styleUrls: ['material.component.scss'],
    templateUrl: 'material.component.html',
})
export class MaterialComponent {

    constructor(private menuService: MenuService) {
        
    }
}
