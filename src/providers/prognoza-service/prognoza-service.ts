import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class PrognozaServiceProvider {

    apiKey: string = "47edaf91add3b199a99cc1a66e397e90";
    url: string = "http://api.openweathermap.org/data/2.5/weather?q=";
    units: string = "metric";

    constructor(public http: HttpClient) {
    }

    vratiPrognozu(grad, drzava) {
        return this.http.get(this.url + grad + "," + drzava + "&units=" + this.units + "&APPID=" + this.apiKey);
    }


}
