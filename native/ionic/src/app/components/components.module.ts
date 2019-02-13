import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SliderComponent} from './slider/slider.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [SliderComponent],
    entryComponents: [SliderComponent],
    bootstrap: [],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SliderComponent
    ]
})
export class ComponentsModule {
}
