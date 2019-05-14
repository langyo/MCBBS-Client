import {Injectable} from '@angular/core';
import {InAppBrowser, InAppBrowserObject} from '@ionic-native/in-app-browser';

@Injectable({
    providedIn: 'root'
})
export class BrowserService {
    website: InAppBrowserObject;

    constructor() {
    }

    public open(url: string, hide: boolean = true) {
        const target = '_blank';
        const options = 'hidden = ' + hide ? 'yes' : 'no';
        this.website = InAppBrowser.create(url, target, options);
    }

    public hide() {
        this.website.hide();
    }


    public doScript(script: string) {
        return this.website.executeScript({code: script});
    }

}
