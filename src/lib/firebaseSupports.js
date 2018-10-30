/**
 *@author langyo
 *@file 提供对 Firebase 的支持，此部分实际上已不访问论坛本体，而是使用卫星站点
 *@description 此部分代码的 config 部分禁止修改，任何修改了 config 的分支合并请求全部拒绝
 */
import firebase from "firebase";

let config = {
  apiKey: "AIzaSyCwXhqMDOcU1AjDQo1uS46jjSf85TeY_Ho",
  authDomain: "mcbbs-client.firebaseapp.com",
  databaseURL: "https://mcbbs-client.firebaseio.com",
  projectId: "mcbbs-client",
  storageBucket: "mcbbs-client.appspot.com",
  messagingSenderId: "576964331812"
};
firebase.initializeApp(config);
