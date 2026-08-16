import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Booking } from './booking/booking';
import { Destinations } from './destinations/destinations';
import { MyBookings } from './my-bookings/my-bookings';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'booking',
    component: Booking
  },
  {
    path: 'destinations',
    component: Destinations
  },
  {
    path: 'my-bookings',
    component: MyBookings
  }
];