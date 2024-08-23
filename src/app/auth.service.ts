import { inject, Injectable, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { UserProps } from "./user.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  currentUserSigned = signal<UserProps | null | undefined>(undefined)

  register(email: string, password: string, username: string) : Observable<void>{
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(response => updateProfile(response.user, {displayName: username}))
    return from(promise)
  }

  login(email: string, password: string) : Observable<void>{
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(response => console.log(response.user))
    return from(promise)
  }

  logout(): Observable<void>{
    const promise = signOut(this.firebaseAuth)
    return from(promise)
  }
}