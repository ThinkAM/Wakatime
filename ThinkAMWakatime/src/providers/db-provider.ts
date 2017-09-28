import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DbProvider {
    constructor(private storage: Storage, private sqlite: SQLite) {
        this.storage.length().then((length: number) => {
            console.log(length);
        });
    }

    get(key: string): any {
        return this.storage.get(key);
    }

    set(key: string, value: any) {
        return this.storage.set(key, value);
    }

    remove(key: string) {
        return this.storage.remove(key);
    }

    like(key: string) {
        return new Promise((resolve, reject) => {
            let retorno: any[] = [];
            this.storage.keys().then((keys: string[]) => {
                let count: number = 0;

                keys.forEach((keyData: string) => {
                    if (keyData.indexOf(key, 0) !== -1) {
                        this.storage.get(keyData).then((res: any[]) => {
                            if (Array.isArray(res)) {
                                res.forEach((resItem: any) => {
                                    retorno.push(resItem);
                                });

                                count++;

                                if (count >= keys.length)
                                    resolve(retorno);
                            } else {
                                retorno.push(res);

                                count++;

                                if (count >= keys.length)
                                    resolve(retorno);
                            }
                        });
                    } else {
                        count++;

                        if (count >= keys.length)
                            resolve(retorno);
                    }
                });
            });
        });
    }

    likeRemove(key: string) {
        return new Promise((resolve, reject) => {
            this.storage.keys().then((keys: string[]) => {
                let count: number = 0;

                keys.forEach((keyData: string) => {
                    if (keyData.indexOf(key, 0) !== -1) {
                        this.remove(keyData);

                        count++;

                        if (count >= keys.length)
                            resolve(true);
                    } else {
                        count++;

                        if (count >= keys.length)
                            resolve(true);
                    }
                });
            });
        });
    }

    public count<T>(key: string): Promise<number> {
        return this.storage.get(key).then((res: T[]) => {
            try {
                return res.length || 0;
            } catch (error) {
                console.log(error);
                return 0;
            }
        });
    }
}
