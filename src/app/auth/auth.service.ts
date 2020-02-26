import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { UiService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.action';
import { Store } from '@ngrx/store';
import * as AUTH from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private fbAuth: AngularFireAuth,
    private uiService: UiService,
    private store: Store<fromRoot.State>) { }

  initAuthListner() {
    const userProfile = JSON.parse(localStorage.getItem('user'));
    if (userProfile) {
      this.store.dispatch(new AUTH.Login({userId: userProfile.id, email: userProfile.email}));
    }

    this.fbAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AUTH.Login({userId: user.uid, email: user.email}));
        this.router.navigate(['/createpoll']);
      } else {
        this.store.dispatch(new AUTH.Logout());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.fbAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(user => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new AUTH.Login({userId: user.user.uid, email: user.user.email}));
        // this.uiService.loadingStateChanged.next(false);
        console.log(user);
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(err.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.fbAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(user => {
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new AUTH.Login({userId: user.user.uid, email: user.user.email}));
      // this.uiService.loadingStateChanged.next(false);
      console.log(user);
    }).catch(err => {
      this.store.dispatch(new UI.StopLoading());
      // this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackBar(err.message, null, 3000);
    });
  }

  logout() {
    this.store.dispatch(new UI.StopLoading());
    this.store.dispatch(new AUTH.Logout());
    this.fbAuth.auth.signOut();
  }

}
