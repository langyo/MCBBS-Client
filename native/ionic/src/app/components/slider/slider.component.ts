import {Component, OnInit , Input} from '@angular/core';
import {forEach} from '@angular-devkit/schematics';
import {of} from 'rxjs';
import { InAppBrowserObject} from '@ionic-native/in-app-browser';

const data = require('../../testData.json');

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
@Input() webSite: InAppBrowserObject;
    slideOpts = {
        effect: 'flip',
        loop: true
    };
    pics: Array<string>;

    constructor() {
        const that = this;
        this.pics = [];
        data.mainPage.headImages.forEach(function (i) {
            that.pics.push(i);
        });
    }

    onInie(e) {
        e.target.startAutoplay();
    }

    ngOnInit() {
    }

}
