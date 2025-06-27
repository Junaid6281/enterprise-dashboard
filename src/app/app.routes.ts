import { Routes } from '@angular/router';
//import { LoginComponent } from './features/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './features/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./features/dashboard').then(m => m.DashboardModule) },
  { path: 'analytics', canActivate: [AuthGuard], loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent) },
  { path: 'reports', canActivate: [AuthGuard], loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent) },
  { path: 'settings', canActivate: [AuthGuard], loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) },
];
