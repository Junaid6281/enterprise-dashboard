export interface ReportsData {
  totalReports: number;
  generatedThisMonth: number;
  pendingReports: number;
  reportTypes: ReportType[];
}

export interface ReportType {
  type: string;
  count: number;
} 