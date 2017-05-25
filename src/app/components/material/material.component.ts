import { Component } from '@angular/core';
import { MenuService } from '../../services/MenuService'
import { Http } from '@angular/http';

@Component({
    styleUrls: ['material.component.scss'],
    templateUrl: 'material.component.html',
})
export class MaterialComponent {

    modelOpen: boolean;
    materials: Array<object>;
    title: string;
    file: File;
    course: object;


    constructor(private menuService: MenuService, private http: Http) {
        this.getMaterials()
    }

    getMaterials() {
        this.menuService.loaded.then(() => {
            this.course = this.menuService.menu[this.menuService.selectedClassIndex];
            console.log(this.menuService.menu);
            console.log(this.course);
            this.http.get(this.menuService.rubyServerUrl + '/materials/' + this.course['id']).subscribe((res) => {
                this.materials = res.json();
                console.log(this.materials);
            });
        });

    }

    onFileChange($event: any) {
        this.file = $event.target.files[0];
    }

    addMaterial() {
        this.menuService.loaded.then(() => {
            let promise = new Promise((resolve, reject) => {

                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve();
                        } else {
                            reject(xhr.response);
                        }
                    }
                };

                xhr.open('POST', this.menuService.rubyServerUrl + '/upload/material/' + this.course['id'], true);

                let formData = new FormData();
                formData.append("file", this.file, this.file.name);
                formData.append("title", this.title)
                xhr.send(formData);
            });
            promise.then(() => {
                this.modelOpen = false;
                this.getMaterials();
            })
        });
    }

    download(material: object) {
        this.menuService.loaded.then(() => {
            this.http.get(this.menuService.rubyServerUrl + '/file?name=' + material['filepath']).subscribe(()=> {
                console.log("File downloaded");
            })
        });
    }
}
