import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RideType } from '../../models/ride';
import { loadRidesSuccess, updateRide } from '../../redux/actions/ride.actions';
import {
  selectAllRides,
  selectRideErrors,
} from '../../redux/selectors/ride.selector';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrl: './editable-input.component.scss',
  providers: [DatePipe],
})
export class EditableInputComponent implements OnInit {
  @Input() initialValue: string;
  @Input() ride: RideType;
  @Input() rideId: number;
  @Input() inputTitle: string;
  @Input() segmentIndex: number;
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

  ngOnInit(): void {
    this.form.addControl('inputValue', this.fb.control(this.initialValue));
  }

  startEditing() {
    this.isEditing = true;
  }

  saveText() {
    this.initialValue = this.form.get('inputValue')?.value; // Update text value from the form control
    this.isEditing = false;
    const formattedDate = new Date(this.initialValue);
    const rideIndex = this.ride.schedule.findIndex(
      item => item.rideId === this.rideId,
    );
    const copyOfTime = [
      ...this.ride.schedule[rideIndex].segments[this.segmentIndex].time,
    ];
    const deepCopyOfRide: RideType = JSON.parse(JSON.stringify(this.ride));
    if (this.inputTitle == 'Departure') {
      copyOfTime[1] = formattedDate.toISOString();
    } else if ((this.inputTitle = 'Arrival')) {
      copyOfTime[0] = formattedDate.toISOString();
    }
    deepCopyOfRide.schedule[rideIndex].segments[this.segmentIndex].time =
      copyOfTime;
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
    this.isEditing = false;
    this.form.get('inputValue')?.setValue(this.initialValue); // Reset to the original value on cancel
  }
}
