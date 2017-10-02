import { Injectable } from '@angular/core';

@Injectable()
export class Date {
    format(date: string){
        let dateArray = date.substring(0, 10).split("-");

        return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
    }
}