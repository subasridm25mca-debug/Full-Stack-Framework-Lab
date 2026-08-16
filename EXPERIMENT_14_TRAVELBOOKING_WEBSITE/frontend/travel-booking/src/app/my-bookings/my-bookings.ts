import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

interface Booking {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  travellers: string;
  package: string;
  requests: string;
  createdAt?: string;
}

@Component({
  selector: 'app-my-bookings',
  imports: [],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {

  bookings: Booking[] = [];

  loading = true;
  errorMessage = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  async loadBookings(): Promise<void> {

    try {

      const response = await fetch(
        'http://localhost:5000/api/bookings'
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: Booking[] = await response.json();

      console.log('Bookings received:', data);

      this.bookings = data;
      this.loading = false;

      // Update Angular UI
      this.cdr.detectChanges();

    } catch (error) {

      console.error('Failed to load bookings:', error);

      this.errorMessage =
        'Unable to load bookings. Please try again.';

      this.loading = false;

      this.cdr.detectChanges();
    }
  }
}