import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public registrationForm!: UntypedFormGroup;
  public otherInfoForm!: UntypedFormGroup;
  public isLoggingIn: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public loginForm!: UntypedFormGroup;
  private sub: Subscription = new Subscription();
  public isSiginingUp: boolean = false;
  public registerFormSubmitted: boolean = false;
  public error_message: string = '';
  public currentPage = 'company-information';
  public isFirstPage = true;
  public uid = "";

  constructor(
    private fb: UntypedFormBuilder, 
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
    ) {
    this.afAuth = afAuth;
  }

  ngOnInit() {
    this.initRegisterForm();
    window.scroll(0, 0);
  }

  public initRegisterForm() {
    this.registrationForm = this.fb.group(
      {
        RoleId: [0, Validators.required],
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        PhoneNo1: ['', Validators.required],
        PersonalEmail: ['', [Validators.required, Validators.email]],
        Password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9]).{8,}$/),
          ],
        ],
        ConfirmPassword: ['', [Validators.required]],
      },
      { validators: [this.passwordMatchValidator] }
    );
  }

  public passwordMatchValidator(f: UntypedFormGroup) {
    return f.get('Password')?.value === f.get('ConfirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  public setPage(page: string) {
    this.currentPage = page;
  }

  public previousPage(page: string) {
    this.currentPage = page;
  }

  async onSubmit() {
    this.isSiginingUp = true;
    if (this.registrationForm.valid) {
      this.isSiginingUp = true;
      const payload = this.registrationForm.value;
  
      const email = payload.PersonalEmail;
      const password = payload.Password;
      const userRole = payload.RoleId;
      const firstName = payload.FirstName;
      const lastName = payload.LastName;
  
      try {
        console.log("done");
        // Create user in Firebase Authentication
        await this.afAuth.createUserWithEmailAndPassword(email, password);
      } catch (err: any) {
        this.error_message = err;
      }
      
      this.isSiginingUp = false;
      
      // Get the newly created user's UID
      const user = await this.afAuth.onAuthStateChanged((user) => {
        if (user?.uid != undefined) {
          this.uid = user.uid;
        } else {
          this.uid = ""
        }
      });;
      // Create a document in Firestore with the user's UID as the document ID
      await this.firestore.collection('users').doc(this.uid).set({
        email: email,
        userRole: userRole,
        firstName: firstName,
        lastName: lastName
        // Add any other additional attributes you want to store
      });
      
      // Navigate to the Dashboard
      if (userRole == 1) {
        this.router.navigate(['dashboard/storage-bin']);
      } else {
        this.router.navigate(['dashboard/cars-management']);
      }
    }
  }

  public async register() {
    this.registerFormSubmitted = true;
    if (!this.registrationForm.valid) {
      this.error_message = 'Please fill all required field!';
      window.scroll(0, 0);
    }
    if (this.registrationForm.valid) {
      await this.onSubmit();
    }
  }

  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      this.register();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
