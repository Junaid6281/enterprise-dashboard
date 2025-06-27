export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: string;
  topPages: PageView[];
}

export interface PageView {
  page: string;
  views: number;
} 