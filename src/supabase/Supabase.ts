import type {
  PostgrestSingleResponse,
  SupabaseClient,
} from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

import type { SupabaseResponse } from "~/@types/supabase";

export type Providers = "google" | "discord" | "github";

export class Supabase {
  static TABLE_NAME = "schedules";
  
  private SUPABASE: SupabaseClient;
  private userId = "";
  private userName = "";
  private mailAddress= "";
  private iconUrl = "";

  private usedProvider = "";

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
    const res =await this.SUPABASE.from(Supabase.TABLE_NAME)
      .select("*")
      .eq("userId", this.userId)
      .gte("date", `${year}-${`0${month + 1}`.slice(-2)}-01`)
      .lte(
        "date",
        `${month == 11 ? year + 1 : year}-${`0${
          month == 11 ? 1 : month + 2
        }`.slice(-2)}-01`
      )
      .select();

    return res;
  };

  public regisisterSchedule = async (
    title: string,
    date: number[],
    start: string | null = null,
    end: string | null = null,
    memo: string | null = null
  ): Promise<PostgrestSingleResponse<SupabaseResponse[]>> => {
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
      .eq("scheduleId", uid)
      .select();

  public deleteSchedule = async (
    uid: number
  ): Promise<PostgrestSingleResponse<SupabaseResponse[]>> =>
    await this.SUPABASE.from(Supabase.TABLE_NAME)
      .delete()
      .eq("scheduleId", uid)
      .select();

  public signIn = async (provider : Providers) => {
    this.userId = this.userName = this.mailAddress = "";
    this.usedProvider = provider as string;
    await this.SUPABASE.auth.signInWithOAuth({
      provider: provider,
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  public signOut = async (): Promise<boolean> =>{
    this.userId = this.userName = this.mailAddress = "";
    const {error} = await this.SUPABASE.auth.signOut();
    return error==null;
  }

  public getUserId = async (): Promise<string | undefined> => {
    if (this.userId != "") return this.userId;
    const { data} = await this.SUPABASE.auth.getSession();

    this.userId =  data.session?.user.id ?? "";
    
    return this.userId;
  };

  public getUserName = async (): Promise<string | undefined > =>{
    if(this.userName!="")return this.userName;
    const { data} = await this.SUPABASE.auth.getSession();
    this.userName =await data.session?.user.user_metadata.full_name as string;
    return this.userName;
  }

  public getMailAddress = async (): Promise<string | undefined > =>{
    if(this.mailAddress!="")return this.mailAddress;
    const { data} = await this.SUPABASE.auth.getSession();
    
    this.mailAddress  = data.session?.user.email as string;
    
    return this.mailAddress;
  }

  public getIconUrl = async() =>{
    if(this.iconUrl!="")return this.iconUrl;
    const {data} = await this.SUPABASE.auth.getSession();
    const url: string = data.session?.user.user_metadata.avatar_url as string;
    const res: Response = await fetch(url);
    const blob: Blob = await res.blob();
    this.iconUrl= (window.URL || window.webkitURL).createObjectURL(blob)
    return this.iconUrl;
  }

  public getClient = (): SupabaseClient => {
    return this.SUPABASE;
  };
}
