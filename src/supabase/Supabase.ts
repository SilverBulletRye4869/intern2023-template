import type {
  PostgrestSingleResponse,
  Session,
  SupabaseClient,
} from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

import type { SupabaseResponse } from "~/@types/supabase";

export class Supabase {
  static TABLE_NAME = "schedules";
  private SUPABASE: SupabaseClient;
  private userId = "";

  constructor() {
    const url: string = import.meta.env.VITE_PROJECT_URL as string;
    const key: string = import.meta.env.VITE_PROJECT_KEY as string;
    this.SUPABASE = createClient(url, key);
    void this.getUserId();
  }

  public getSchedules = async (
    year: number,
    month: number
  ): Promise<PostgrestSingleResponse<SupabaseResponse[]>> => {
    console.log("a id:" + this.userId);
    return await this.SUPABASE.from(Supabase.TABLE_NAME)
      .select("*")
      .eq("userId", await this.getUserId())
      .gte("date", `${year}-${`0${month + 1}`.slice(-2)}-01`)
      .lte(
        "date",
        `${month == 11 ? year + 1 : year}-${`0${
          month == 11 ? 0 : month + 2
        }`.slice(-2)}-01`
      );
  };

  public regisisterSchedule = async (
    title: string,
    date: number[],
    start: string | null = null,
    end: string | null = null,
    memo: string | null = null
  ): Promise<PostgrestSingleResponse<SupabaseResponse[]>> => {
    console.log(this.getUserId());
    return await this.SUPABASE.from(Supabase.TABLE_NAME)
      .insert({
        userId: await this.getUserId(),
        title: title,
        date: `${date[0]}-${`0${date[1]}`.slice(-2)}-${`0${date[2]}`.slice(
          -2
        )}`,
        startTime: start ? start + ":00" : null,
        endTime: end ? end + ":00" : null,
        memo: memo,
      })
      .select();
  };

  public updateSchedule = async (
    uid: number,
    title: string,
    start: string | null = null,
    end: string | null = null,
    memo: string | null = null
  ): Promise<PostgrestSingleResponse<SupabaseResponse[]>> =>
    await this.SUPABASE.from(Supabase.TABLE_NAME)
      .update({
        title: title,
        startTime: start ? start + ":00" : null,
        endTime: end ? end + ":00" : null,
        memo: memo,
      })
      .eq("sche_id", uid)
      .select();

  public deleteSchedule = async (
    uid: number
  ): Promise<PostgrestSingleResponse<SupabaseResponse[]>> =>
    await this.SUPABASE.from(Supabase.TABLE_NAME)
      .delete()
      .eq("sche_id", uid)
      .select();

  public signIn = async () => {
    this.userId = "";
    await this.SUPABASE.auth.signInWithOAuth({
      provider: "discord",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  public getUserId = async (): Promise<string | undefined> => {
    if (this.userId != "") return this.userId;
    const { data, error } = await this.SUPABASE.auth.getSession();
    /*
    console.log(data);
    console.log(data.session);
    console.log(data.session?.user);
    console.log(data.session?.user.id);*/
    this.userId = data.session?.user.id ?? "";
    return this.userId;
  };

  public getClient = (): SupabaseClient => {
    return this.SUPABASE;
  };
}
