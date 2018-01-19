import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './component/appcomponent/app.component';
import { HomeComponent } from './component/home/home.component';
import { HelloComponent } from './component/hello/hello.component';
import { listItemComponent } from './component/listItem/listItem.component';
import { ElModule } from 'element-angular'
import { RouterModule,Routes }   from '@angular/router';
import { LoginComponent } from './component/login/login.component';
export const ROUTES:Routes=[
      {path: '',component: LoginComponent},
      {path: 'home', component: HomeComponent },
      // { path: '/profile/:username', component: ProfileComponent }

      // { path: 'settings', 
      //   component: SettingsComponent,
      //   children: [
      //     { path: 'profile', component: ProfileSettingsComponent },
      //     { path: 'password', component: PasswordSettingsComponent }
      //   ]
      // }
    ]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelloComponent,
    listItemComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ElModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
