package net.mcbbs.client.main.client;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.URI;

public class WSClient extends WebSocketClient {
    private final WSSocketReceiver receiver = new WSSocketReceiver();

    public WSClient() {
        super(URI.create("localhost:2033"));
    }

    @Override
    public void onOpen(ServerHandshake serverHandshake) {

    }

    @Override
    public void onMessage(String s) {
    }

    @Override
    public void onClose(int i, String s, boolean b) {

    }

    @Override
    public void onError(Exception e) {
        e.printStackTrace();
    }
}
