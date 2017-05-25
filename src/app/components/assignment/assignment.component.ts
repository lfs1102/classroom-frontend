import { Component } from '@angular/core';
import { MenuService } from '../../services/MenuService'
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { UserService } from '../../services/UserService'

@Component({
    styleUrls: ['assignment.component.scss'],
    templateUrl: 'assignment.component.html',
})
export class AssignmentComponent {

    course: object;
    assignment: object;
    assignments: Array<object>;
    params: object;

    
    documentUrl: string;
    gitCommands: string;

    loaded: Promise<any>;

    constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router, private http: Http, private userService: UserService) {

    }

    ngOnInit() {
        this.menuService.loaded.then(() => {
            this.course = this.menuService.menu[this.menuService.selectedClassIndex];
            console.log(this.course);
            this.loaded = new Promise((resolve, reject) => {
                this.menuService.get(`/classes/${this.course['id']}/assignments`).subscribe(res => {
                    this.assignments = res.json()['assignments'];
                    resolve();
                });
            })
            this.route.params.subscribe(params => {
                this.params = params;
                console.log(params);
                let assignmentID = params['assignmentID'];
                let assignmentSubItem = params['assignmentSubItem'];
                if (assignmentID && assignmentSubItem) {
                    this.loaded.then(() => {
                        this.assignment = this.getAssignment(assignmentID);
                        if (this.assignment) {
                            if (assignmentSubItem == 'Document') {
                                this.documentUrl = this.menuService.rubyServerUrl + '/file/gitlab?url=' + this.assignment['web_url'] + '/raw/master/README.md';
                            }
                            else if (assignmentSubItem == 'Submission') {
                                this.gitCommands = [
                                    'git init',
                                    'git add .',
                                    'git commit -m "first commit."',
                                    `git remote add origin https://gitlab.lifengshuang.website/${this.userService.username}/${this.assignment['name']}.git`,
                                    'git push origin master'
                                ].map(x => '  ' + x).join("\n");
                                this.menuService.post(`/classes/${this.course['id']}/assignments/fork/${this.assignment['id']}`, {}).subscribe((res) => {
                                    console.log("Submission ready")
                                });
                            }
                        }
                    });
                } else {
                    this.loaded.then(() => {
                        if (this.assignments.length > 0) {
                            this.switchAssignment(this.assignments[0], 'Document');
                        }
                    });
                }
            })
        });
    }

    switchAssignment(assignment: object, subItem: string) {
        if (!subItem) {
            let subItemParam = this.params['assignmentSubItem'];
            if (subItemParam) {
                subItem = subItemParam;
            } else {
                subItem = 'Document';
            }
        }
        this.router.navigate(['/assignment', {
            class: this.menuService.selectedClassIndex, 
            assignmentID: assignment['id'],
            assignmentSubItem: subItem
        }]);
    }

    getAssignment(id: number) {
        for (let item of this.assignments) {
            if (item['id'] == id) {
                return item;
            }
        }
        return null;
    }
}
