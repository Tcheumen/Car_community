import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Cars, StorageBin } from '../shared/models/response.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss'],
})
export class MakeAppointmentComponent implements OnInit {
  formSubmitted: boolean = false;
  apptForm!: UntypedFormGroup;
  public cars: Cars[] = [];
  public uid: string = "";
  public isSubmitted = false;

  data: StorageBin = {
    name: 'Marina Herns',
    location: {
      houseNumber: 9,
      streetName: 'Sefrd Jumns',
      city: 'Hansberger',
    },
    serviceTime: {
      start: '1:30PM',
      end: '4:30PM',
    },
    uid: "123"
  };

  constructor(private fb: UntypedFormBuilder, private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  async ngOnInit() {
    this.initForm();
    await this.afAuth.onAuthStateChanged((user) => {
      if (user?.uid != undefined) {
        this.uid = user.uid;
        this.getCars();
      } else {
        this.uid = ""
      }
    });;
    this.getCars();
  }

  public getCars(): void {
    this.firestore
      .collection<Cars>('cars', ref =>
        ref.where('uid', '==', this.uid)
      )
      .snapshotChanges() // Use snapshotChanges() instead of valueChanges()
      .subscribe((snapshots) => {
        this.cars = snapshots.map((snapshot) => {
          const car: Cars = snapshot.payload.doc.data() as Cars;
          car.id = snapshot.payload.doc.id; // Assign the document ID to car.id
          return car;
        });
      });
  }

  initForm() {
    this.apptForm = this.fb.group({
      date: ['', Validators.required],
      car: ['', Validators.required],
    });
  }

  public submit() {
    this.firestore.collection('appointments').add({
      uid_request: this.uid,
      car: this.apptForm.value.car,
      date: this.apptForm.value.date,
      bin: "Lager Gießen",
      status: "pending"
    });
    this.apptForm.reset();
    this.isSubmitted = true;
  }

  getIsSubmitted() {
    return this.isSubmitted;
  }
  
}
