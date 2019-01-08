import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PodesavanjaPage} from "../podesavanja/podesavanja";
import {PrognozaServiceProvider} from "../../providers/prognoza-service/prognoza-service";
import {Storage} from "@ionic/storage";
import {Lokacija} from "../../models/lokacija.interface";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    prognoza: any;
    lokacija: Lokacija;

    putanja: string = 'assets/imgs/';
    ekstenzija: string = '.jpg';

    constructor(public navCtrl: NavController, private prognozaService: PrognozaServiceProvider, private storage: Storage) {
    }

    ionViewWillEnter() {
        this.storage.get('lokacija').then(
            (vrednost) => {
                if (vrednost != null) {
                    let lokacija = JSON.parse(vrednost);
                    this.lokacija = {
                        grad: lokacija.grad,
                        drzava: lokacija.drzava
                    }
                } else {
                    this.podesiDefaultLokaciju();
                }
                this.vratiPrognozu(this.lokacija.grad, this.lokacija.drzava);
            }
        );
    }

    vratiPrognozu(grad, drzava) {
        this.prognozaService.vratiPrognozu(grad, drzava)
            .subscribe(
                prognoza => this.prognoza = prognoza,
                error => {
                    this.podesiDefaultLokaciju();
                    this.vratiPrognozu(this.lokacija.grad, this.lokacija.drzava);
                }
            );
    }

    podesiDefaultLokaciju() {
        this.lokacija = {
            grad: 'Belgrade',
            drzava: 'RS'
        };
    }

    podesavanja() {
        this.navCtrl.push(PodesavanjaPage, {lokacija: this.lokacija});
    }


}
