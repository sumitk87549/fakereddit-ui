import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"user-profile/:name", component:UserProfileComponent, canActivate: [AuthGuard]},
  {path:"view-post/:id", component:ViewPostComponent},
  {path:"list-subreddits", component:ListSubredditsComponent},
  {path:"create-post", component:CreatePostComponent, canActivate: [AuthGuard]},
  {path:"create-subreddit", component:CreateSubredditComponent, canActivate: [AuthGuard]},
  {path:"sign-up", component:SignUpComponent},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
