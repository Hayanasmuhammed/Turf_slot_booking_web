import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr({
      positionClass: 'toast-bottom-right', // 👈 Show toasts at bottom center
    }), // ✅ Adds ngx-toastr support
    importProvidersFrom(BrowserAnimationsModule),
  ],
};
