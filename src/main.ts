import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    //provideHttpClient(), // <-- Add this line!
    
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    ),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));
