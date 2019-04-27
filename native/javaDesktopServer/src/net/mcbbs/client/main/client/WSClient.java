package net.mcbbs.client.main.client;

import net.mcbbs.client.main.client.cmd.Command;
import net.mcbbs.client.main.client.cmd.CommandExecutor;
import net.mcbbs.client.main.client.cmd.CommandParseException;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.io.IOException;
import java.net.URI;

public class WSClient extends WebSocketClient {
    private final WSSocketReceiver receiver = new WSSocketReceiver();
    public WSClient(){
        super(URI.create("localhost:2033"));
    }
    @Override
    public void onOpen(ServerHandshake serverHandshake) {

    }

    @Override
    public void onMessage(String s) {
        Command command = receiver.commandParse(s);
        String result = receiver.commandExecute(command);
        send(result);
    }

    @Override
    public void onClose(int i, String s, boolean b) {

    }

    @Override
    public void onError(Exception e) {
        e.printStackTrace();
    }
}
