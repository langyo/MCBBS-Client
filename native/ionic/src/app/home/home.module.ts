import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ComponentsModule} from '../components/components.module';
import {HomePage} from './home.page';

@NgModule({
    imports: [
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
