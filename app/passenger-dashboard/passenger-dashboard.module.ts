import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PassengerDashboardComponent } from "./containers/passenger-dashboard/passenger-dashboard.component";
import { PassengerDetailComponent } from "./components/passenger-detail/passenger-detail.component";
import { PassengerCountComponent } from "./components/passenger-count/passenger-count.component";

/**
 * Declarations: declare components from this feature module
 * Exports: to use the declared components in other modules
 * Imports: import modules
 */
@NgModule({
  declarations: [
    PassengerDashboardComponent,
    PassengerDetailComponent,
    PassengerCountComponent
  ],
  imports: [CommonModule],
  exports: [PassengerDashboardComponent]
})
export class PassengerDashboardModule {}
