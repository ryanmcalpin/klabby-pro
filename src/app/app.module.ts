import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { DbService } from './db.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { BidSheetComponent } from './bid-sheet/bid-sheet.component';
import { BidSheetFormComponent } from './bid-sheet-form/bid-sheet-form.component';
import { HomeComponent } from './home/home.component';
import { RatesComponent } from './rates/rates.component';
import { ReversePipe } from './reverse.pipe';
import { LoginComponent } from './login/login.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
}

@NgModule({
  declarations: [
    AppComponent,
    BidSheetComponent,
    BidSheetFormComponent,
    HomeComponent,
    RatesComponent,
    ReversePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    DbService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
