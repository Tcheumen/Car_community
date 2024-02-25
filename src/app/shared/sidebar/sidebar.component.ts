import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/shared/models/response.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public isOpen: boolean = false;
  public isWarehouseOwner: boolean = true;
  public uid: string = ""

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  

  async ngOnInit(): Promise<void> {
    const user = await this.afAuth.onAuthStateChanged((user) => {
      if (user?.uid != undefined) {
        this.uid = user.uid;
        console.log(this.uid);
        this.firestore
          .collection<User>('users').doc(this.uid)
          .valueChanges() // Subscribe to the Observable to get the data
          .subscribe((user: User | undefined) => {
            user = user; // Assign the received data
            this.isWarehouseOwner = user?.userRole == "1";
      });
      } else {
        this.uid = ""
      }
    });;
  }


  public logout(): void {
    this.afAuth.signOut();
    
  }

  public getIsWarehouseowner() {
    return this.isWarehouseOwner;
  }
}
