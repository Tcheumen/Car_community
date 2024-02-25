import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageBin } from 'src/app/shared/models/response.model';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-all-storage-bins',
  templateUrl: './all-storage-bins.component.html',
  styleUrls: ['./all-storage-bins.component.scss'],
})
export class AllStorageBinsComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public uid: string = "";
  public storageBins: StorageBin[] = [{
    name: 'Lore ipsum',
    location: {
      houseNumber: 5,
      streetName: 'Sefrd Jumns',
      city: 'Hansberger',
    },
    serviceTime: {
      start: '12:30PM',
      end: '4:30PM',
    },
    uid: "123"
  }];
  public binForm!: UntypedFormGroup;


  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private activeRoute: ActivatedRoute,
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore
  ) {}

  async ngOnInit(): Promise<void> {
    await this.afAuth.onAuthStateChanged((user) => {
      if (user?.uid != undefined) {
        this.uid = user.uid;
        this.getAllStorageBins(user.uid);
      } else {
        this.uid = ""
      }
    });;
    this.initBinForm();
  }

  public initBinForm(): void {
    this.binForm = this.fb.group({
      name: ['', Validators.required],
      location: this.fb.group({
        houseNumber: ['', Validators.required],
        streetName: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
      serviceTime: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required],
      }),
    });
  }

  public async submit() {
    const form = this.binForm.value;
    const user = await this.afAuth.currentUser;
    
    this.firestore.collection('storages').add({
      name: form.name,
      location: {
        houseNumber: form.location.houseNumber,
        streetName: form.location.streetName,
        city: form.location.city,
      },
      serviceTime: { 
        start: form.serviceTime.start,
        end: form.serviceTime.end 
      },
      uid: user?.uid,
    });
    this.getAllStorageBins(this.uid);
    this.binForm.reset();
  }



  getAllStorageBins(uid: string) {
    this.firestore
      .collection<StorageBin>('storages', ref =>
      ref.where('uid', '==', uid))
      .valueChanges() // Subscribe to the Observable to get the data
      .subscribe((storageBins: StorageBin[]) => {
        if (storageBins.length > 0) {
          this.storageBins = storageBins; // Assign the received data
        }
    });
}

 
 
  editStorage(id: string) {
    this.router.navigate(['edit', id], { relativeTo: this.activeRoute });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
