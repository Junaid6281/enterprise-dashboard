import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDataService } from '../../services/dashboard-data.service';
import { AnalyticsData } from '../../interfaces';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule,NgChartsModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  analyticsData: AnalyticsData = {
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: '',
    topPages: []
  };
  chartData: any = null;
  chartLabels: string[] = [];
  chartDatasets: any[] = [];
  chartOptions: any = {};
  loading = true;
  error = '';

  constructor(private dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    this.loadAnalyticsData();
    this.loadChartData();
  }

  loadAnalyticsData(): void {
    this.loading = true;
    this.error = '';
    this.dashboardDataService.getAnalyticsData().subscribe({
      next: (data) => this.analyticsData = data,
      error: (err) => this.error = 'Failed to load analytics data.'
    });
    this.loading = false;
  }

  loadChartData(): void {
    this.dashboardDataService.getChartData('Traffic Chart').subscribe({
      next: (data) => {
        this.chartData = data;
        this.chartLabels = data.labels;
        this.chartDatasets = data.datasets;
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
  }
}
