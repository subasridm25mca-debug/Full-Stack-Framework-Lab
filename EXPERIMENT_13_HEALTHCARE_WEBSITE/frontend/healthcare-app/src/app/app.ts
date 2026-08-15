import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  appointment = {
    name: '',
    age: 0,
    doctorType: '',
    date: ''
  };

  message = '';

  constructor(private http: HttpClient) {}

  bookAppointment() {

    this.http.post(
      'http://localhost:5000/api/appointments/book',
      this.appointment
    ).subscribe({

      next: (response: any) => {

        this.message = response.message;

        this.appointment = {
          name: '',
          age: 0,
          doctorType: '',
          date: ''
        };

      },

      error: (error) => {

        console.log(error);
        this.message = 'Error booking appointment';

      }

    });

  }
}