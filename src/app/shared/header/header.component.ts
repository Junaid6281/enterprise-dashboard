import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface User {
  name: string;
  avatar: string;
  email: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showUserMenu = false;
  
  currentUser: User = {
    name: 'Admin User',
    avatar: '👤',
    email: 'admin@enterprise.com'
  };

  constructor(private auth: AuthService, private router: Router) {}

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  onProfileClick(): void {
    console.log('Profile clicked');
    this.showUserMenu = false;
    // TODO: Navigate to profile page
  }

  onLogoutClick(): void {
    this.auth.logout();
    this.showUserMenu = false;
    this.router.navigate(['/']);
  }
}
