import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
      // const url = 'https://cordova.apache.org';
      // const target = '_blank';
      // const options = 'location=yes'
      // const ref = cordova.InAppBrowser.open(url, target, options);
      //
      // ref.addEventListener('loadstart', loadstartCallback);
      // ref.addEventListener('loadstop', loadstopCallback);
      // ref.addEventListener('loadloaderror', loaderrorCallback);
      // ref.addEventListener('exit', exitCallback);
      //
      // function loadstartCallback(event) {
      //     console.log('Loading started: '  + event.url);
      // }
      //
      // function loadstopCallback(event) {
      //     console.log('Loading finished: ' + event.url);
      // }
      //
      // function loaderrorCallback(error) {
      //     console.log('Loading error: ' + error.message);
      // }
      //
      // function exitCallback() {
      //     console.log('Browser is closed...');
      // }
  }
}
