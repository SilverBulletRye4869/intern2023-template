export type { Schedule, ScheduleTable };

interface Schedule {
  uid: number; //db側のid
  id: number; //ScheduleTable[]川のid
  title: string;
  start: string;
  end: string;
  memo: string;
  allowEdit: boolean;
}

interface ScheduleTable {
  year: number;
  month: number;
  day: number;
  isHoliday: boolean;
  nextId: number;
  schedules: Schedule[];
}
