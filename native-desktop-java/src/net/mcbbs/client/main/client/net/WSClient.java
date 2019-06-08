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

package net.mcbbs.client.main.client.net;

import net.mcbbs.client.main.client.command.CommandDispatcher;
import net.mcbbs.client.main.client.command.CommandParser;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.URI;

public class WSClient extends WebSocketClient {
    public static final WSClient INSTANCE = new WSClient();
    public CommandParser parser = new CommandParser();
    private WSClient() {
        super(URI.create("localhost:2033"));
        connect();
    }

    @Override
    public void onOpen(ServerHandshake serverHandshake) {
        System.out.println("Connection established:"+serverHandshake.getHttpStatus()+","+serverHandshake.getHttpStatusMessage());
    }

    @Override
    public void onMessage(String s) {
        CommandDispatcher.DISPATCHER.dispatchAsync(parser.parse(s));
    }

    @Override
    public void onClose(int i, String s, boolean b) {

    }

    @Override
    public void onError(Exception e) {
        e.printStackTrace();
    }
}
