import { Injectable } from "@angular/core";

@Injectable()
export class Utility {

    diff_years(dt2: Date, dt1: Date): number {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff / 365.25));
    }

}