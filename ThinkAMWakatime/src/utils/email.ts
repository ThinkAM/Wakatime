import { Injectable } from '@angular/core';

@Injectable()
export class Email {
    validateEmail(email: string) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true);
        }

        return (false);
    }
}