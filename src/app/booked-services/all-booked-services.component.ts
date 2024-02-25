import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Cars } from '../shared/models/response.model';
import { BookedService } from './models/booked-service.model';

@Component({
  selector: 'app-all-booked-services',
  templateUrl: './all-booked-services.component.html',
  styleUrls: ['./all-booked-services.component.scss'],
})
export class AllBookedServicesComponent implements OnInit {
  public services: BookedService[] = [];
  public searchForm!: UntypedFormGroup;
  public searched: boolean = false;
  public searchFormSubmitted: boolean = false;
  public requestStatusPending = false;
  public cars: Cars[] = [];
  public uid: string = "";


  constructor(private fb: UntypedFormBuilder, private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  async ngOnInit() : Promise<void> {
    this.initSearchForm();
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

  public initSearchForm(): void {
    this.searchForm = this.fb.group({
      car: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  public submit() {
    if (this.searchForm.valid) {
      setTimeout(() => {
        this.searched = true;
        this.getAllParkingSpace();
      }, 1000);
    }
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

  public getAllParkingSpace(): void {
    
    this.services = [
      {
        id: 1,
        name: 'Nuno Ferreira',
        dateListed: '10/05/2023',
        expiryDate: '13/09/2023',
        status: "accepted",
      },
      {
        id: 2,
        name: 'Fabrice Kukoam',
        dateListed: '15/06/2023',
        expiryDate: '17/09/2023',
        status: "pending",
      },
      {
        id: 3,
        name: 'Nuno Ferreira',
        dateListed: '29/06/2023',
        expiryDate: '17/10/2023',
        status: "accepted",
      },
      {
        id: 4,
        name: 'Osama Ragab',
        dateListed: '07/07/2023',
        expiryDate: '17/11/2023',
        status: "pending",
      }
    ];
  }

  public isRequestStatusPending() : boolean{
    return this.requestStatusPending;
  }
}
