import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public isLoggingIn: boolean = false;
  public loginFormSubmitted: boolean = false;
  public error_message: string = '';
  public loginForm!: UntypedFormGroup;
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth = afAuth;
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      this.loginFormSubmitted = true;
      const payload = this.loginForm.value;
      const email = payload.email;
      const password = payload.password;

      try {
        await this.afAuth
          .signInWithEmailAndPassword(email, password)
          .then((res) => {
            this.isLoggingIn = false;
            this.router.navigate(['dashboard/main']);
          });
      } catch (err: any) {
        this.isLoggingIn = false;
        this.error_message = err;
      }
      this.isLoggingIn = false;
      this.loginFormSubmitted = false;
    }
  }
  public async login() {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      this.isLoggingIn = true;
      await this.onSubmit();
    }
  }
  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.login();
    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
