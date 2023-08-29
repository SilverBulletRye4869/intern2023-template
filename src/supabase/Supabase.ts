/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {
  PostgrestSingleResponse,
  SupabaseClient} from "@supabase/supabase-js";
import {
  createClient,
} from "@supabase/supabase-js";

export class Supabase {
  static TABLE_NAME = "schedule";
  private SUPABASE: SupabaseClient<any, "public", any>;

  constructor() {
    this.SUPABASE = createClient(
      import.meta.env.VITE_PROJECT_URL,
      import.meta.env.VITE_PROJECT_KEY
    );
  }

  public getSchedules = async (
    year: number,
    month: number
  ): Promise<PostgrestSingleResponse<any[]>> =>
    await this.SUPABASE.from(Supabase.TABLE_NAME)
      .select("*")
      .gte("date", `${year}-${`0${month + 1}`.slice(-2)}-01`)
      .lte(
        "date",
        `${month == 11 ? year + 1 : year}-${`0${
          month == 11 ? 0 : month + 2
        }`.slice(-2)}-01`
      );

  public regisisterSchedule = async (
    title: string,
    date: number[],
    start: string | null = null,
    end: string | null = null,
    memo: string | null = null
  ): Promise<PostgrestSingleResponse<any[]>> =>
    await this.SUPABASE.from(Supabase.TABLE_NAME)
      .insert({
        user_id: 0,
        title: title,
        date: `${date[0]}-${`0${date[1]}`.slice(-2)}-${`0${date[2]}`.slice(
          -2
        )}`,
        startTime: start ? start + ":00" : null,
        endTime: end ? end + ":00" : null,
        memo: memo,
      })
      .select();

  public updateSchedule = async (
    uid: number,
    title: string,
    start: string | null = null,
    end: string | null = null,
    memo: string | null = null
  ) =>
    await this.SUPABASE.from(Supabase.TABLE_NAME)
      .update({
        title: title,
        startTime: start ? start + ":00" : null,
        endTime: end ? end + ":00" : null,
        memo: memo,
      })
      .eq("sche_id", uid);

  public deleteSchedule = async (uid: number) =>
    await this.SUPABASE.from(Supabase.TABLE_NAME).delete().eq("sche_id", uid);

  public get = (): SupabaseClient<any, "public", any> => {
    return this.SUPABASE;
  };
}
