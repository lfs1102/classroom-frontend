import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { NotificationComponent } from './components/notification/notification.component'
import { MemberComponent } from './components/member/member.component'
import { AssignmentComponent } from './components/assignment/assignment.component'
import { MaterialComponent } from './components/material/material.component'
import { LoginComponent } from './components/login/login.component'

export const ROUTES: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'assignment', component: AssignmentComponent},
    {path: 'notification', component: NotificationComponent},
    {path: 'material', component: MaterialComponent},
    {path: 'member', component: MemberComponent},
    {path: 'login', component: LoginComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
