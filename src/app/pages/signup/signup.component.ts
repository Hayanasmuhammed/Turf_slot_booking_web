import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TurfBookingServiceService } from '../../services/turf-booking-service.service';

@Component({
  selector: 'app-signup',
  imports: [RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  constructor(private turfBookingService: TurfBookingServiceService) {}

  ngOnInit(): void {}

  onSubmit(signUpForm: any) {
    this.turfBookingService.signUpAUser(signUpForm.value).subscribe({
      next: (response: any) => {
        // handle response here
      },
    });
  }
}
