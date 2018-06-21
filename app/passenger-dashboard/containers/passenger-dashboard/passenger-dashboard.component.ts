import { Component, OnInit } from "@angular/core";
import { Passenger } from "../../models/passenger.interface";
import { PassengerService } from "../../passenger.service";

@Component({
  selector: "passenger-dashboard",
  styleUrls: ["passenger-dashboard.component.scss"],
  template: `
    <div>
      <passenger-count [items]="passengers"></passenger-count>
      <passenger-detail
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (remove)="handleRemove($event)"
        (edit)="handleEdit($event)">

      </passenger-detail>

    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[] = [];

  constructor(private passengerDashboardService: PassengerService) {
  }

  ngOnInit(): void {
    this.passengerDashboardService
      .getPassengers()
      .subscribe((data: Passenger[]) => (this.passengers = data));
  }

  handleRemove(event: Passenger) {
    this.passengerDashboardService
      .removePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.filter(
          (passenger: Passenger) => passenger.id !== event.id
        );
      });
  }

  handleEdit(event: Passenger) {
    this.passengerDashboardService
      .updatePassengers(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            // immutable operation: merge event in passenger in a new object
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }
}
