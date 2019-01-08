import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PodesavanjaPage} from "../podesavanja/podesavanja";
import {PrognozaServiceProvider} from "../../providers/prognoza-service/prognoza-service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    prognoza: any;
    lokacija: {
        grad: string,
        drzava: string
    };

    putanja: string = 'assets/imgs/';
    ekstenzija: string = '.jpg';

    constructor(public navCtrl: NavController, private prognozaService: PrognozaServiceProvider) {
    }

    ionViewWillEnter() {
        this.lokacija = {
            grad: 'Belgrade',
            drzava: 'RS'
        };

        this.prognozaService.vratiPrognozu(this.lokacija.grad, this.lokacija.drzava)
            .subscribe(prognoza =>
                this.prognoza = prognoza
            );
    }

    podesavanja() {
        this.navCtrl.push(PodesavanjaPage);
    }

}
