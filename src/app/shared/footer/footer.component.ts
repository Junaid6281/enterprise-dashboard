import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  onPrivacyClick(event: Event): void {
    event.preventDefault();
    console.log('Privacy Policy clicked');
    // TODO: Navigate to privacy policy page
  }

  onTermsClick(event: Event): void {
    event.preventDefault();
    console.log('Terms of Service clicked');
    // TODO: Navigate to terms page
  }

  onSupportClick(event: Event): void {
    event.preventDefault();
    console.log('Support clicked');
    // TODO: Navigate to support page
  }
}
