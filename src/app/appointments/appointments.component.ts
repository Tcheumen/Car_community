import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Appointments,
  Cars,
  User
} from '../shared/models/response.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  
  // The model for the data structure of Appointments you will find it in shared/models/response.model.ts , and you will find there all models so you can change it as you want to fit you DB

  public allAppointments: Appointments[] = [];


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getAllAppointments();
  }

  public getAllAppointments(): void {
    this.firestore
     .collection<Appointments>('appointments')
    .snapshotChanges()
    .subscribe((snapshots) => {
    this.allAppointments = snapshots.map((snapshot) => {
      const appointment: Appointments = snapshot.payload.doc.data() as Appointments;
      // asign user Name
      this.firestore
      .collection<User>('users/').doc(appointment.uid_request)
      .valueChanges() // Subscribe to the Observable to get the data
      .subscribe((user: User  | undefined) => {
        if (user) {
          appointment.uid_request = user?.firstName + " " + user?.lastName;
        }
      });
      // asign car Name
      this.firestore
      .collection<Cars>('cars')
      .valueChanges() // Subscribe to the Observable to get the data
      .subscribe((cars: Cars[]) => {
        if (cars[0]) {
          appointment.car = cars[0]?.brand + " " + cars[0]?.name;
        }
      });
      return appointment;
    });
    
  });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
