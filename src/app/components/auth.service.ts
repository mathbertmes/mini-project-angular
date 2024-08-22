import { inject, Injectable } from "@angular/core";
import { Auth, getAuth, GoogleAuthProvider } from "@angular/fire/auth";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)


}