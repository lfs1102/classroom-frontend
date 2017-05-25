import { Component } from '@angular/core';
import { MenuService } from '../../services/MenuService'

@Component({
    styleUrls: ['member.component.scss'],
    templateUrl: 'member.component.html',
})
export class MemberComponent {

    members: Array<object>;

    constructor(private menuService: MenuService) {
        // this.menuService.loaded.then(() => {
        //     let course = this.menuService.menu[this.menuService.selectedClassIndex];
        //     if (!this.members) {
        //         this.menuService.get(`/classes/${course['id']}/members`).subscribe((res) => {
        //             this.members = res.json();
        //             console.log(this.members);
        //         });
        //     }
        // });
        this.members = this.menuService.members;
    }
}
