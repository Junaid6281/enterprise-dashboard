import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDataService } from '../../services/dashboard-data.service';
import { ReportsData } from '../../interfaces/reports.interfaces';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reportsData: ReportsData = {
    totalReports: 0,
    generatedThisMonth: 0,
    pendingReports: 0,
    reportTypes: []
  };
  chartData: any = null;
  chartLabels: string[] = [];
  chartDatasets: any[] = [];
  chartOptions: any = {};
  loading = true;
  error = '';

  constructor(private dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    this.loadReportsData();
    this.loadChartData();
  }

  private loadReportsData(): void {
    this.dashboardDataService.getReportsData().subscribe(data => {
      this.reportsData = data;
    });
  }

  private loadChartData(): void {
    this.dashboardDataService.getChartData('Reports Chart').subscribe({
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
