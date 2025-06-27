export interface DashboardMetric {
  metricKey: string;
  title: string;
  value: number;
  changeValue: number;
  changeType: 'positive' | 'negative';
  icon: string;
  color: string;
  lastUpdated: string;
}

export interface ActivityItem {
  activityID: number;
  activityType: string;
  message: string;
  icon: string;
  activityDate: string;
  userName?: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}

export interface ChartData {
  chartName: string;
  labels: string[];
  datasets: ChartDataset[];
} 