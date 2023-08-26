import supabase from '@/app/supabase';
import { run } from 'node:test';
import { NextResponse } from 'next/server';

class PlayerModel {
  #id?: number;
  #accountId?: number;
  #displayName?: string;
  #lastLogin?: string;
  #lastPluginVersion?: string;
  #lastToken?: string;
  #lastIpAddress?: string;
  #exists = false;

  #db_access_token?: string;
  #db_refresh_token?: string;

  get getId() {
    return this.#id;
  }

  set setId(value: number) {
    this.#id = value;
  }

  get getAccountId() {
    return this.#accountId;
  }

  set setAccountId(value: number) {
    this.#accountId = value;
  }

  get getDisplayName() {
    return this.#displayName;
  }

  set setDisplayName(value: string) {
    this.#displayName = value;
  }

  get getPlayerByAccountId(): Promise<PlayerModel> {
    return new Promise(async (resolve) => {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('accountId', this.#accountId)
        .limit(1)
        .single();

      if (data) {
        this.#id = data.id;
        this.#displayName = data.displayName;
        this.#lastLogin = data.lastLogin;
        this.#lastPluginVersion = data.lastPluginVersion;
        this.#lastToken = data.lastToken;
        this.#lastIpAddress = data.lastIpAddress;
        this.#exists = true;
      }

      resolve(this);
    });
  }

  setPlayerInDB = async (player: Record<string, string>) => {
    const { data } = await supabase
      .from('players')
      .insert(player)
      .select('*')
      .single();

    if (data) {
      this.#id = data.id;
      this.#displayName = data.displayName;
      this.#lastLogin = data.lastLogin;
      this.#lastPluginVersion = data.lastPluginVersion;
      this.#lastToken = data.lastToken;
      this.#lastIpAddress = data.lastIpAddress;
      this.#exists = true;
    }

    return this;
  };

  setRunInDB = async (
    gameMode: 'rmc' | 'rms',
    runData: Record<string, string>
  ) => {
    const data = {
      ...runData,
      player_id: this.#id,
    };

    const { data: result, error } = await supabase
      .from(gameMode)
      .insert(data)
      .select('*')
      .single();

    if (error)
      return NextResponse.json(
        {
          message: 'Error something went wrong adding to db',
          data,
        },
        { status: 400 }
      );

    return result;
  };

  get exists(): boolean {
    return this.#exists;
  }

  get login(): Promise<PlayerModel> {
    return new Promise(async (resolve) => {
      const result = await supabase.auth.signInWithPassword({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      });

      if (result.data.session) {
        this.#db_access_token = result.data.session.access_token;
        this.#db_refresh_token = result.data.session.refresh_token;

        await supabase.auth.setSession({
          access_token: this.#db_access_token!,
          refresh_token: this.#db_refresh_token!,
        });
      }

      resolve(this);
    });
  }
}

export default PlayerModel;
