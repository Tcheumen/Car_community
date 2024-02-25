import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BinRequest, Cars, User } from '../shared/models/response.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-all-parking-space',
  templateUrl: './all-parking-space.component.html',
  styleUrls: ['./all-parking-space.component.scss'],
})
export class AllParkingSpaceComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public requests: BinRequest[] = [];
  public uid = "";

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async ngOnInit(): Promise<void> {
    await this.afAuth.onAuthStateChanged((user) => {
      if (user?.uid != undefined) {
        this.uid = user.uid;
        this.getAllRequest();
      } else {
        this.uid = ""
      }
    });;
    this.getAllRequest();
  }

  public getAllRequest(): void {
    this.firestore
      .collection<BinRequest>('bin_requests', ref =>
      ref.where('uid_storage', '==', this.uid)
    )
    .snapshotChanges()
    .subscribe((snapshots) => {
      this.requests = snapshots.map((snapshot) => {
        const request: BinRequest = snapshot.payload.doc.data() as BinRequest;
        request.id = snapshot.payload.doc.id; // Assign the document ID to car.id
        // asign user Name
        this.firestore
        .collection<User>('users/').doc(request.uid_request)
        .valueChanges() // Subscribe to the Observable to get the data
        .subscribe((user: User  | undefined) => {
          if (user) {
            request.uid_request = user?.firstName + " " + user?.lastName;
          }
        });
        // asign car Name
        this.firestore
        .collection<Cars>('cars/').doc(request.car_id)
        .valueChanges()
        .subscribe((car: Cars  | undefined) => {
          if (car) {
            request.plate = car?.brand + " " + car?.name;
          }
        });
        return request;
      });
      console.log(this.requests);
      
    });
  }
 
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async accept(id: string) {
    this.firestore
      .collection('bin_requests')
      .doc(id)
      .update({ status: "ready" });
  }

  async deny(id: string) {
    this.firestore
      .collection('bin_requests')
      .doc(id)
      .update({ status: "denied" });
  }

  async change_readyness(id: string) {
    var carStatus = "";
    for (var request of this.requests) {
      if (request.id == id) {
        carStatus = request.status;
      }
    }
    console.log(carStatus);

    if (carStatus === "ready") {
      console.log("here1");
      this.firestore
      .collection('bin_requests')
      .doc(id)
      .update({ status: "not-ready" });
    } else {
      console.log("here2");
      this.firestore
      .collection('bin_requests')
      .doc(id)
      .update({ status: "ready" });
    }
  }
}
