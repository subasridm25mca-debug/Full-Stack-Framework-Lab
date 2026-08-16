import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Booking } from './booking/booking';
import { Destinations } from './destinations/destinations';
import { MyBookings } from './my-bookings/my-bookings';
import { Hotels } from './hotels/hotels';
import { Villas } from './villas/villas';
import { Packages } from './packages/packages';
import { Trains } from './trains/trains';
import { Buses } from './buses/buses';
import { Cabs } from './cabs/cabs';
import { Tours } from './tours/tours';
import { Visa } from './visa/visa';
import { Cruise } from './cruise/cruise';
import { Forex } from './forex/forex';

export const routes: Routes = [

  // Home / Flights
  {
    path: '',
    component: Home
  },

  // Booking
  {
    path: 'booking',
    component: Booking
  },

  // Destinations
  {
    path: 'destinations',
    component: Destinations
  },

  // My Bookings
  {
    path: 'my-bookings',
    component: MyBookings
  },

  // Hotels
  {
    path: 'hotels',
    component: Hotels
  },

  //villas
  {
  path: 'villas',
  component: Villas
},

//packages
{
  path: 'packages',
  component: Packages
},

//trains
{
  path: 'trains',
  component: Trains
},

//buses
{
  path: 'buses',
  component: Buses
},

//cabs
{
  path: 'cabs',
  component: Cabs
},

//tours
{
  path: 'tours',
  component: Tours
},

//visa
{
  path: 'visa',
  component: Visa
},

//cruise
{
  path: 'cruise',
  component: Cruise
},

//forex
{
  path: 'forex',
  component: Forex
}

];