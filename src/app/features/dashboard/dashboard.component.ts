import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDataService } from '../../services/dashboard-data.service';
import { DashboardMetric, ActivityItem, ChartData } from '../../interfaces';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  metrics: DashboardMetric[] = [];
  activity: ActivityItem[] = [];
  chartData: ChartData | null = null;
  loading = true;
  error = '';
  chartLabels: string[] = [];
  chartDatasets: any[] = [];
  chartOptions: any = {};

  constructor(private dashboardDataService: DashboardDataService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = '';
    this.dashboardDataService.getDashboardMetrics().subscribe({
      next: (data) => {
        this.metrics = data.map(metric => ({
          ...metric,
          icon: this.getMetricIcon(metric.metricKey)
        }));
      },
      error: (err) => this.error = 'Failed to load metrics.'
    });
    this.dashboardDataService.getRecentActivity().subscribe({
      next: (data) => {
        this.activity = data.map(item => ({
          ...item,
          icon: this.getActivityIcon(item.activityType)
        }));
      },
      error: (err) => this.error = 'Failed to load activity.'
    });
    this.dashboardDataService.getChartData('Revenue Chart').subscribe({
      next: (data) => {
        this.chartData = data;
        this.chartLabels = data.labels || [];
        this.chartDatasets = data.datasets || [];
        this.chartOptions = {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: true, text: data.chartName }
          }
        };
      },
      error: (err) => this.error = 'Failed to load chart data.'
    });
    this.loading = false;
  }

  getMetricIcon(metricKey: string): string {
    switch (metricKey) {
      case 'revenue': return 'fas fa-dollar-sign';
      case 'users': return 'fas fa-users';
      case 'orders': return 'fas fa-shopping-cart';
      case 'growth': return 'fas fa-chart-line';
      default: return 'fas fa-info-circle';
    }
  }

  getActivityIcon(activityType: string): string {
    switch (activityType) {
      case 'login': return 'fas fa-sign-in-alt';
      case 'purchase': return 'fas fa-shopping-bag';
      case 'update': return 'fas fa-edit';
      default: return 'fas fa-bell';
    }
  }
} 