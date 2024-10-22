import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { environment } from '../environments/environments';

@NgModule({
  declarations: [
    // tus componentes aquí
  ],
  imports: [
    BrowserModule,
  
  ],
  providers: [],
  bootstrap: [/* tu componente principal aquí */]
})
export class AppModule { }
