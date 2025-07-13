import { TestBed } from '@angular/core/testing';

import { TurfBookingServiceService } from './turf-booking-service.service';

describe('TurfBookingServiceService', () => {
  let service: TurfBookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurfBookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
