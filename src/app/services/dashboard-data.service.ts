import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DashboardMetric, ActivityItem, ChartData } from '../interfaces';
import { AnalyticsData } from '../interfaces';
import { ReportsData } from '../interfaces';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getDashboardMetrics(): Observable<DashboardMetric[]> {
    return this.http.get<DashboardMetric[]>(`${this.apiUrl}dashboard/metrics`);
  }

  getRecentActivity(count: number = 10): Observable<ActivityItem[]> {
    return this.http.get<ActivityItem[]>(`${this.apiUrl}dashboard/recent-activity?count=${count}`);
  }

  getChartData(chartName: string): Observable<ChartData> {
    return this.http.get<ChartData>(`${this.apiUrl}dashboard/chart-data/${chartName}`);
  }

  getAnalyticsData(days: number = 30): Observable<AnalyticsData> {
    return this.http.get<AnalyticsData>(`${this.apiUrl}analytics?days=${days}`);
  }

  getReportsData(): Observable<ReportsData> {
    return this.http.get<ReportsData>(`${this.apiUrl}reports/summary`);
  }

  getRecentOrders(): Observable<RecentOrder[]> {
    const orders: RecentOrder[] = [
      {
        id: '#1234',
        customer: 'John Doe',
        product: 'Premium Plan',
        amount: 299,
        status: 'completed',
        date: '2024-01-15'
      },
      {
        id: '#1235',
        customer: 'Jane Smith',
        product: 'Basic Plan',
        amount: 99,
        status: 'pending',
        date: '2024-01-15'
      },
      {
        id: '#1236',
        customer: 'Bob Johnson',
        product: 'Enterprise Plan',
        amount: 999,
        status: 'completed',
        date: '2024-01-14'
      },
      {
        id: '#1237',
        customer: 'Alice Brown',
        product: 'Premium Plan',
        amount: 299,
        status: 'cancelled',
        date: '2024-01-14'
      }
    ];
    return of(orders);
  }

  login(email: string, password: string, remember: boolean) {
    return this.auth.login(email, password, remember);
  }
}
