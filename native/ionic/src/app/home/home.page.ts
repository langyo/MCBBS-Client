import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserEvent  } from '@ionic-native/in-app-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
    css = {code: 'body{background-color:red;}'};
    cont = {};
  constructor( ) {
      const url = 'https://jihuayu.github.io/';
      const target = '_blank';
      const options = 'location=yes';
      const ref = InAppBrowser.create(url, target, options);
      const that = this;
      ref.on('loadstop').subscribe(event => {
          that.cont = ref.executeScript({file: './test.js'});
          console.log(window.localStorage['a']);
          console.log(event.type);
          console.log(event.url);
          ref.hide();
          // ref.insertCSS({ code: 'body{color: black;}' });
      });

      // ref.insertCSS()
      // ref.addEventListener('loadstop', loadstopCallback);
      // ref.addEventListener('loadloaderror', loaderrorCallback);
      // ref.addEventListener('exit', exitCallback);
      //
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
