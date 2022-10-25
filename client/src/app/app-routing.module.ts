import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
   {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'members',component:MemberListComponent,canActivate:[AuthGuard]},
      {
        path:'members/:username',component:MemberDetailComponent
      },
      {
        path:'lists',component:ListsComponent
      },
      {
        path:'messages',component:MessagesComponent
      },
    ]
  },
  {
    path:'errors',component:TestErrorsComponent
  },
  {
    path:'not-found',component:NotFoundComponent
  },
  {
    path:'server-error',component:ServerErrorComponent
  },
  {
    path:'**',component:NotFoundComponent,pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }