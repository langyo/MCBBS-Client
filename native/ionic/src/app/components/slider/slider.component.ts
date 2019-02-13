import {Component, OnInit} from '@angular/core';
import {forEach} from '@angular-devkit/schematics';
import {of} from 'rxjs';

const data = require('../../testData.json');

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

    slideOpts = {
        effect: 'flip'
    };
    pics: Array<string>;
    constructor() {
        const that = this;
        this.pics = [];
        data.mainPage.headImages.forEach(function (i) {
            that.pics.push(i.img);
        });
        console.log(this.pics);
    }

    ngOnInit() {
    }

}
