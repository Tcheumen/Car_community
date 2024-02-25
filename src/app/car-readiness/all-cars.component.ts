import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Cars } from '../shared/models/response.model';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.scss'],
})
export class AllCarsComponent implements OnInit, OnDestroy {
  public searchForm!: UntypedFormGroup;
  public searched: boolean = false;
  public searchFormSubmitted: boolean = false;
  private sub: Subscription = new Subscription();
  public cars: Cars[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    // private location: Location,
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.getAllParkingSpace();
    this.initSearchForm();
  }

  public initSearchForm(): void {
    this.searchForm = this.fb.group({
      searchType: ['plate', Validators.required],
      term: ['', Validators.required],
    });
  }


  public submit() {
    this.searched=true;
  }


  public getAllParkingSpace(): void {
    this.cars = [];
  }

  public addNewStorageBin() {
    this.router.navigate(['add'], { relativeTo: this.activeRoute });
  }


  editStorage(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.activeRoute });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
