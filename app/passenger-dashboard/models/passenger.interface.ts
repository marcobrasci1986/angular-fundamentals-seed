import { Baggage } from "./baggage.interface";

export interface Passenger {
  id: number;
  fullname: string;
  checkedIn: boolean;
  checkInDate?: number;
  baggage: string;
}
