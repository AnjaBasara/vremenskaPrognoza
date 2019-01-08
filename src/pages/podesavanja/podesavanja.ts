import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Lokacija} from "../../models/lokacija.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
    selector: 'page-podesavanja',
    templateUrl: 'podesavanja.html',
})
export class PodesavanjaPage {

    lokacija: Lokacija;
    forma: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private storage: Storage, private formBuilder: FormBuilder) {

        this.lokacija = this.navParams.get('lokacija');

        this.forma = this.formBuilder.group({
            grad: [this.lokacija.grad, Validators.required],
            drzava: [this.lokacija.drzava, Validators.required]
        });

    }

    sacuvajLokaciju(lokacija: Lokacija) {
        this.storage.set('lokacija', JSON.stringify(lokacija))
        this.navCtrl.pop();
    }

}
