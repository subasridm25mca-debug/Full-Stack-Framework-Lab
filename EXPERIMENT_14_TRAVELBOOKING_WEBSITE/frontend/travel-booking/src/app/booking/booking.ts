import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking {

  booking = {
    fullName: '',
    email: '',
    phone: '',
    destination: 'Goa',
    travelDate: '',
    travellers: '1 Traveller',
    package: 'Family Package',
    requests: ''
  };

  bookingConfirmed = false;

  constructor(private http: HttpClient) {}

  confirmBooking() {

    this.http.post(
      'http://localhost:5000/api/bookings',
      this.booking
    ).subscribe({

      next: (response) => {
        console.log('Booking saved:', response);

        this.bookingConfirmed = true;
      },

      error: (error) => {
        console.error('Booking failed:', error);
        alert('Booking failed. Please try again.');
      }

    });
  }
}