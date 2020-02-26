import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
    // this.loadingSubscription = this.uiService.loadingStateChanged
    // .subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      agreement: new FormControl(null, [Validators.required])
    });
  }

  onSignup() {
    this.authService.registerUser({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    });
  }

}
