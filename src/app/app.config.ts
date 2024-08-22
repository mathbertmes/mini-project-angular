import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCrXTmkzpSxxZ22eco_4LDtvP2LyU348OQ",
  authDomain: "angular-mini-project-95a4d.firebaseapp.com",
  projectId: "angular-mini-project-95a4d",
  storageBucket: "angular-mini-project-95a4d.appspot.com",
  messagingSenderId: "798392887270",
  appId: "1:798392887270:web:8c7de6ccc4c4fe0a481827",
  measurementId: "G-3QY5HSYWFK"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"angular-mini-project-95a4d","appId":"1:798392887270:web:8c7de6ccc4c4fe0a481827","storageBucket":"angular-mini-project-95a4d.appspot.com","apiKey":"AIzaSyCrXTmkzpSxxZ22eco_4LDtvP2LyU348OQ","authDomain":"angular-mini-project-95a4d.firebaseapp.com","messagingSenderId":"798392887270","measurementId":"G-3QY5HSYWFK"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
