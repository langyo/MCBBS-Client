import {Component} from '@angular/core';
import {InAppBrowser, InAppBrowserEvent, InAppBrowserObject} from '@ionic-native/in-app-browser';
// import {a} from './test1.js';
import {browser} from 'protractor';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage {
    css = {code: 'body{background-color:red;}'};
    cont = {};
  constructor( ) {
      // const url = 'https://jihuayu.github.io/';
      // const target = '_blank';
      // const options = 'location=yes';
      // const ref = InAppBrowser.create(url, target, options);
      // const that = this;
      // ref.on('loadstop').subscribe(event => {
      //     that.cont = ref.executeScript({code: 'var temp = {};\n' +
      //             '$(\'.img_l >a> img\').each(\n' +
      //             '    function (i,j) {\n' +
      //             '        temp[i]=$(this).attr(\'src\');\n' +
      //             '    }\n' +
      //             ');\n' +
      //             'temp;\n'});
      //     console.log(window.localStorage['a']);
      //     console.log(event.type);
      //     console.log(event.url);
      //     ref.hide();
      //     // ref.insertCSS({ code: 'body{color: black;}' });
      // });
      browser
          .init({browserName: 'chrome'})
          .get('http://admc.io/wd/test-pages/guinea-pig.html')
          .title()
          .should.become('WD Tests')
          .elementById('i am a link')
          .click()
          .eval('window.location.href')
          .should.eventually.include('guinea-pig2')
          .back()
          .elementByCss('#comments').type('Bonjour!')
          .getValue().should.become('Bonjour!')
          .fin(function() { return browser.quit(); })
          .done();
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
