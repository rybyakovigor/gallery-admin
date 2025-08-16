import { makeAutoObservable } from 'mobx';

class AuthStore {
  public constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public login(key: string): void {
    if (key !== import.meta.env.VITE_AUTH_KEY) {
      throw new Error('Неверный ключ');
    }
    localStorage.setItem('token', key);
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public getApiKey(): string | null {
    return localStorage.getItem('token');
  }

  public get isAuth(): boolean {
    return !!this.getApiKey();
  }
}

export type AuthStoreType = AuthStore;

const authStore = new AuthStore();
export default authStore;
