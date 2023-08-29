export type { SupabaseResponse };

interface SupabaseResponse {
  scheduleId: number;
  userId: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
}
