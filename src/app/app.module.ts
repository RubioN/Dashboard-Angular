import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthService } from './login/auth.service';
import { UserService } from './login/user.service';

import { BrowserModule } from '@angular/platform-browser';

import { MomentDateAdapter, MOMENT_DATE_FORMATS } from 'app/calendar/moment-date-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, MAT_NATIVE_DATE_FORMATS } from '@angular/material';


var language = navigator.language
if (language.indexOf("fr") == -1 && language.indexOf("FR") == -1) {
  language = "en-US"
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    BrowserModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent
  ],
  providers: [AuthService, UserService,
      { provide: MAT_DATE_LOCALE, useValue: language }, //useValue: 'fr-FR'
    //   { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
    //   { provide: DateAdapter, useClass: MomentDateAdapter },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }