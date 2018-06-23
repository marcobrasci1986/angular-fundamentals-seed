import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";
import { Baggage } from "../../models/baggage.interface";

@Component({
  selector: "passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: `
  <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
    <div>
      Passenger name:
      <input 
        type="text" 
        name="fullname"
        required
        [ngModel]="detail?.fullname" 
        #fullname="ngModel">
      <div *ngIf="fullname.dirty && fullname.errors?.required" class="error">
        Passenger name is required
      </div>
      
      {{ fullname.errors | json}}
    </div>
    <div>
      Passenger id:
      <input 
        type="number" 
        name="id" 
        required
        #id="ngModel"
        [ngModel]="detail?.id">
      <div *ngIf="id.dirty && id.errors?.required" class="error">
        Passenger id is required
      </div>
      {{ id.errors | json}}
    </div>
    
    <div>
      <label>
        <input type="checkbox" name="checkedIn" [value]="true" [ngModel]="detail?.checkedIn"
        (ngModelChange)="toggleCheckedIn($event)">
      </label>
    </div>
    
    <div *ngIf="form.value.checkedIn">
      Check In Date:
      <input type="number" name="checkInDate" [ngModel]="detail?.checkInDate">
    </div>
    
    <div>
      Baggage:
      <select name="baggage" [ngModel]="detail?.baggage">
        <option *ngFor="let item of baggage" [value]="item.key" [selected]="item.key === detail?.baggage">
          {{ item.value }}
        </option>
      </select>
    </div>
    
    <button type="submit" [disabled]="form.invalid">
      Update passenger
    </button>


   <pre>{{ form.value | json}}</pre> 
   <pre>Valid: {{ form.valid | json}}</pre> 
   <pre>Invalid: {{ form.invalid | json}}</pre> 
  </form>
    
  `
})
export class PassengerFormComponent {
  @Input() detail: Passenger;
  @Output() update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: "none",
      value: "No Baggage"
    },
    {
      key: "hand-only",
      value: "Hand Baggage"
    },
    {
      key: "hold-only",
      value: "Hold Baggage"
    },
    {
      key: "hand-hold",
      value: "Hand And Hold Baggage"
    }
  ];

  toggleCheckedIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
    if (isValid) {
      // emit
      this.update.emit(passenger);
    }
  }
}
