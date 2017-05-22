import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { MarkdownModule } from 'angular2-markdown';

import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { NotificationComponent } from './components/notification/notification.component'
import { MemberComponent } from './components/member/member.component'
import { AssignmentComponent } from './components/assignment/assignment.component'
import { MaterialComponent } from './components/material/material.component'
import { LoginComponent } from './components/login/login.component'
import { MapToIterable } from './pipes'

@NgModule({
    declarations: [
        AppComponent,
        NotificationComponent,
        MemberComponent,
        AssignmentComponent,
        MaterialComponent,
        LoginComponent,
        MapToIterable
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING,
        MarkdownModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
