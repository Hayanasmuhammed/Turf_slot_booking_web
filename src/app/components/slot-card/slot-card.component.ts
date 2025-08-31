import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slot-card',
  imports: [CommonModule],
  templateUrl: './slot-card.component.html',
  styleUrl: './slot-card.component.scss',
})
export class SlotCardComponent {
  selectedSport = 'Cricket'; // default
  selectedDateIndex = 0;

  dates = [
    { label: 'Today', fullDate: 'Apr 24 2024' },
    { label: 'Apr 25', fullDate: 'Apr 25 2024' },
    { label: 'Apr 26', fullDate: 'Apr 26 2024' },
    { label: 'Apr 27', fullDate: 'Apr 27 2024' },
    { label: 'Apr 28', fullDate: 'Apr 28 2024' }
  ];

  slotsData: any = {
    Cricket: [
      { time: '5:00 PM - 6:00 PM', status: 'Booked' },
      { time: '6:00 PM - 7:00 PM', status: 'Booked' },
      { time: '7:00 PM - 8:00 PM', status: 'Booked' },
      { time: '8:00 PM - 9:00 PM', status: 'Booked' },
      { time: '9:00 PM - 10:00 PM', status: 'Available' }
    ],
    Football: [
      { time: '6:00 PM - 7:00 PM', status: 'Available' },
      { time: '7:00 PM - 8:00 PM', status: 'Booked' },
      { time: '8:00 PM - 9:00 PM', status: 'Available' }
    ],
    'Cricket Nets': [
      { time: '5:00 PM - 6:00 PM', status: 'Available' },
      { time: '6:00 PM - 7:00 PM', status: 'Booked' }
    ]
  };

  get slots() {
    return this.slotsData[this.selectedSport] || [];
  }

  selectSport(sport: string) {
    this.selectedSport = sport;
  }

  selectDate(index: number) {
    this.selectedDateIndex = index;
  }

  bookSlot(slot: any) {
    if (slot.status !== 'Booked') {
      slot.status = 'Booked';
      alert(`You booked a ${this.selectedSport} slot at ${slot.time}`);
    }
  }
}
