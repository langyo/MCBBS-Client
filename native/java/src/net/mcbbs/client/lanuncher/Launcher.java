package net.mcbbs.client.lanuncher;

import java.io.IOException;
import java.net.ServerSocket;

/**
 * @author yinyangshi InitAuther97
 */
public class Launcher {
    public static void main(String[] args) {
        //ProcessBuilder pBuilder = new ProcessBuilder("nodejs")
        ServerSocket server;
        try {
            server = new ServerSocket();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
