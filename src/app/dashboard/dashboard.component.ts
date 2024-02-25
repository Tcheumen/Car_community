import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../shared/models/response.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public uid : string = "";
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {}

  async button() {
    const user = await this.afAuth.onAuthStateChanged((user) => {
      if (user?.uid != undefined) {
        this.uid = user.uid;
        console.log(user.uid);
      } else {
        this.uid = ""
      }
    });;
    this.firestore
      .collection<User>('users').doc(this.uid)
      .valueChanges() // Subscribe to the Observable to get the data
      .subscribe((user: User | undefined) => {
        user = user; // Assign the received data
        console.log(user?.userRole);
    });
  }
}

