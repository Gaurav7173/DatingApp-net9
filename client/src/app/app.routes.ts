import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { TestsErrorsComponent } from './errors/tests-errors/tests-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { authGuard } from './_guards/auth.guard';
import { memberDetailedResolver } from './_resolvers/member-detailed.resolver';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [

    {path: 'members', component:MemberListComponent}, // canActivate: [authGuard] is used to protect the route, only logged in users can access it  
    {path: 'members/:username', component:MemberDetailComponent,
        resolve: {member: memberDetailedResolver}}, // resolve the member data before the component is loaded
    {path: 'member/edit', component:MemberEditComponent,
        canDeactivate: [preventUnsavedChangesGuard]}, // canDeactivate: [preventUnsavedChangesGuard] is used to prevent unsaved changes when navigating away from the route
    {path: 'lists', component:ListsComponent},
    {path: 'messages', component:MessagesComponent},

        ]
    },
    {path:'errors', component:TestsErrorsComponent},
    {path:'not-found', component:NotFoundComponent},
    {path:'server-error', component:ServerErrorComponent}, // lazy loading the errors component 
    {path: '**', component:HomeComponent,pathMatch:'full' } // wildcard route to redirect to home if no other route matches,
    
];
