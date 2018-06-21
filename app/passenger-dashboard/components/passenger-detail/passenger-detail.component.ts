import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { Passenger } from "../../models/passenger.interface";

@Component({
  selector: "passenger-detail",
  styleUrls: ["passenger-detail.component.scss"],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)=onNameChange(name.value)
          #name
        >
      </div>
      <div *ngIf="!editing">{{ detail.fullname }}</div>
      <div class="date">
        Check in date:
        {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in' }}
      </div>
      <div class="children">
        Children: {{ detail.children?.length || 0 }}
      </div>
      <button (click)="toggleEdit()">
        {{ editing ? 'Done' : 'Edit'}}
      </button>
      <button (click)="onRemove()">
        Remove
      </button>
    </div>
  `
})
export class PassengerDetailComponent implements OnChanges, OnInit {
  @Input() detail: Passenger;

  editing: boolean = false;

  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onNameChange(value: string) {
    this.detail.fullname = value;
  }
  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  onRemove() {
    this.remove.emit(this.detail);
  }

  /**
   * NgOnChanges runs before NgOnit
   * @param changes
   */
  ngOnChanges(changes): void {
    if (changes.detail) {
      // immutable operation
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
    console.log("OnChanges: " + this.detail.fullname);
  }

  ngOnInit(): void {
    console.log("OnInit: " + this.detail.fullname);
  }
}
