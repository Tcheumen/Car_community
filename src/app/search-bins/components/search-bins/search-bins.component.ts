import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import {Cars,StorageBin,  
} from 'src/app/shared/models/response.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-search-bins',
  templateUrl: './search-bins.component.html',
  styleUrls: ['./search-bins.component.scss'],
})
export class SearchBinsComponent implements OnInit {
  public searchForm!: UntypedFormGroup;
  public searched: boolean = false;
  public searchFormSubmitted: boolean = false;
  public requestStatusPending = false;
  public cars: Cars[] = [];
  public storageBins: StorageBin[] = [];
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
        this.getAllStorageBins();
      }, 1000);
    }
  }

  public async requestBin(name: string) {
    var storageBin: StorageBin = {} as StorageBin;
    var car_id = "";
    this.cars.forEach((car, index) => {
      if(car.plate == this.searchForm.value.car){
        car_id = this.cars[index].id;
        console.log(car_id);
       }
   })
    for (let storage of this.storageBins) {
      if (storage.name == name) {
        storageBin = storage;
      }
    }
    this.firestore.collection('bin_requests').add({
      name: name,
      location: {
        houseNumber: storageBin.location.houseNumber,
        streetName: storageBin.location.streetName,
        city: storageBin.location.city,
      },
      status: "pending",
      plate: this.searchForm.value.car,
      car_id: car_id,
      uid_request: this.uid,
      uid_storage: storageBin.uid,
    });
    this.requestStatusPending = true;
  }

  public getAllStorageBins(): void {
    const form = this.searchForm.value;

    this.firestore
      .collection<StorageBin>('storages', ref =>
      ref.where('location.city', '==', form.city)
    )
      .valueChanges() // Subscribe to the Observable to get the data
      .subscribe((storageBins: StorageBin[]) => {
        this.storageBins = storageBins; // Assign the received data
    });
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
  
  public isRequestStatusPending() : boolean{
    return this.requestStatusPending;
  }
 
}
