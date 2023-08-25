import supabase from '@/app/supabase';

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

  get getId() {
    return this.#id;
  }

  set setId(value) {
    this.#id = value;
  }

  get getAccountId() {
    return this.#accountId;
  }

  set setAccountId(value) {
    this.#accountId = value;
  }

  get getDisplayName() {
    return this.#displayName;
  }

  set setDisplayName(value) {
    this.#displayName = value;
  }

  get getPlayerByAccountId() {
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

      return resolve(this);
    });
  }

  set setPlayerInDB(player) {
    return new Promise(async (resolve) => {
      await supabase.auth.setSession({ access_token: this.#db_access_token });
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
      return resolve(this);
    });
  }

  get exists(): boolean {
    return this.#exists;
  }

  get login() {
    return new Promise(async (resolve) => {
      const result = await supabase.auth.signInWithPassword({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      });

      this.#db_access_token = result.data.session.access_token;

      resolve(this);
    });
  }
}

export default PlayerModel;
