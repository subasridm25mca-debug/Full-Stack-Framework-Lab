import { Component } from '@angular/core';
import { Destinations } from '../destinations/destinations';

@Component({
  selector: 'app-home',
  imports: [Destinations],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}