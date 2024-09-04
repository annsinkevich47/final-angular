import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RideType, Segment } from '../../models/ride';
import { updateRide } from '../../redux/actions/ride.actions';
import { selectRideErrors } from '../../redux/selectors/ride.selector';

@Component({
  selector: 'app-editable-price-inputs',
  templateUrl: './editable-price-inputs.component.html',
  styleUrl: './editable-price-inputs.component.scss',
})
export class EditablePriceInputsComponent implements OnInit {
  @Input() ride: RideType;
  @Input() rideId: number;
  @Input() segmentIndex: number;
  @Input() segment: Segment;
  copySegment: Segment;
  routeId: number;
  error: unknown;
  isEditing = false;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.routeId = this.route.snapshot.params['id'];
  }
  get formControls() {
    return Object.keys(this.form.controls);
  }
  ngOnInit(): void {
    this.copySegment = JSON.parse(JSON.stringify(this.segment));
    const keys = Object.keys(this.copySegment.price).sort((a, b) => {
      return a.localeCompare(b);
    });
    for (let key of keys) {
      this.form.addControl(key, this.fb.control(this.copySegment.price[key]));
    }
  }
  startEditing() {
    this.isEditing = true;
  }

  saveText() {
    Object.keys(this.form.controls).forEach(key => {
      this.copySegment.price[key] = this.form.get(key)?.value;
    });
    this.isEditing = false;
    const rideIndex = this.ride.schedule.findIndex(
      item => item.rideId === this.rideId,
    );
    const deepCopyOfRide: RideType = JSON.parse(JSON.stringify(this.ride));
    deepCopyOfRide.schedule[rideIndex].segments[this.segmentIndex] =
      this.copySegment;
    this.store.select(selectRideErrors).subscribe((error: any) => {
      this.error = error?.error?.message;
    });
    this.store.dispatch(
      updateRide({
        rideId: this.rideId,
        routeId: this.routeId,
        segments: deepCopyOfRide.schedule[rideIndex].segments,
      }),
    );
  }

  cancelEditing() {
    // Revert to the original values and switch back to view mode
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setValue(this.copySegment.price[key]);
    });
    this.isEditing = false;
  }
}
