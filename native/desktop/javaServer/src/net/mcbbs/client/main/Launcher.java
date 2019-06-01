/*
   Copyright 2019 langyo<langyo.china@gmail.com> and contributors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */

package net.mcbbs.client.main;

import net.mcbbs.client.main.client.game.Game;
import net.mcbbs.client.main.client.net.WSClient;
import net.mcbbs.client.main.client.plugin.loading.FileBasedPluginLoader;
import net.mcbbs.client.main.client.plugin.loading.PluginLoader;
import org.java_websocket.client.WebSocketClient;

/**
 * @author yinyangshi InitAuther97
 */
public class Launcher {
    final static PluginLoader loader = new FileBasedPluginLoader();

    public static void main(String[] args) {
        PluginLoader loader = new FileBasedPluginLoader();
        loader.loadPlugin("../../plugin");
        Game.init();
        WebSocketClient wsclient = new WSClient();
        wsclient.connect();
    }

    public static PluginLoader getLoader() {
        return loader;
    }
}
