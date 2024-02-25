import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  Cars,
} from 'src/app/shared/models/response.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, updateDoc, deleteField } from "firebase/firestore";

@Component({
  selector: 'app-available-cars',
  templateUrl: './available-cars.component.html',
  styleUrls: ['./available-cars.component.scss'],
})
export class AvailableCarsComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public cars: Cars[] = [];
  public carForm!: UntypedFormGroup;
  public carFormSubmitted: boolean = false;
  public uid: string = "";

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.afAuth.onAuthStateChanged((user) => {
      if (user?.uid != undefined) {
        this.uid = user.uid;
        this.getAllCars();
      } else {
        this.uid = ""
      }
    });;
    this.getAllCars();
    this.initBinForm();
  }

  public initBinForm(): void {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      year: ['', Validators.required],
      plate: ['', Validators.required]
    });
  }

  public async submitAdd() {
    const form = this.carForm.value;
    const user = await this.afAuth.currentUser;
    
    this.firestore.collection('cars').add({
      name: form.name,
      brand: form.brand,
      year: form.year,
      plate: form.plate,
      uid: user?.uid,
    });
    this.carForm.reset();
  }
  
 
 
  public getAllCars(): void {
    this.firestore
      .collection<Cars>('cars', ref =>
      ref.where('uid', '==', this.uid)
    )
    .valueChanges() // Subscribe to the Observable to get the data
    .subscribe((cars: Cars[]) => {
      this.cars = cars; // Assign the received data
      for (var car of this.cars) {
        if (car.plate == "F - JP 1964") {
          car.status = "Fahrbereit";
          car.location = "Lager Frankfurt";
        } else if (car.plate == "FB - AB 123") {
          car.status = "nicht Fahrbereit";
          car.location = "Lager Lich";
        }
        else  {
          car.status = "Noch nicht eingelagert";
          car.location = "-";
        }
      }
  });




        /*
        // asign car Status and location
        this.firestore
        .collection<BinRequest>('bin_requests/', ref =>
        ref.where('car_id', '==', car.id))
        .valueChanges()
        .subscribe((requests: BinRequest[]) => {
          if (requests[0]) {
            car.status = requests[0]?.status;
          }
        });
        return car;
        */
  }

  public addNewCar() {
    this.router.navigate(['add'], { relativeTo: this.activeRoute });
  }


  getAppointment(id: string) {
    this.router.navigate(['dashboard/make-appointment'], { });
  }

  async deleteCar(id: string) {
    this.firestore
      .collection('cars')
      .doc(id)
      .delete();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
