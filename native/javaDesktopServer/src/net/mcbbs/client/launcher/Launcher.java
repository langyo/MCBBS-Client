package net.mcbbs.client.launcher;

import java.io.IOException;
import java.net.ServerSocket;

/**
 * @author yinyangshi InitAuther97
 */
public class Launcher {
    public static void main(String[] args) {
        int port = 12345;
        ServerSocket server;
        try {
            server = new ServerSocket(port);
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(-1);
        }
    }
}
