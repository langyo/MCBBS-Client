/**
 *@author langyo
 */

import React, { Component } from "react";
import { Platform, StyleSheet, WebView, View } from "react-native";

const instructions = Platform.select({
  ios: "按 ctrl + R 刷新\n" + "按 ctrl + D 打开调试菜单",
  android: "双击 R 刷新,\n" + "摇晃手机或点击菜单按钮以打开调试菜单"
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <WebView style={styles.container} />
        <WebView style={styles.displayWebView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  displayWebView: {
    display: true
  }
});
