import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(signUpForm: any) {
    console.log('Form submitted:', signUpForm);
    // Here you would typically call a service to handle the signup logic
  }
}
