package net.mcbbs.client.main.client.cmd;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class SocketManager {
    public static String sendMessage(String msg) throws IOException {
        try (
                Socket s = new Socket("localhost", 9234);
                Scanner in = new Scanner(s.getInputStream(), "UTF-8");
                PrintWriter out = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), StandardCharsets.UTF_8), true)
        ) {
            out.print(msg);
            out.flush();
            s.shutdownOutput();
            return in.nextLine();
        }
    }

    /**
     * Java 端的 main 在处理完其它杂事后，执行此方法，让主线程死循环
     */
    public static void receiveMessage() {
        try (
                ServerSocket s = new ServerSocket(9233)
        ) {
            while (true) {
                Socket incoming = s.accept();
                Thread t = new Thread(new SocketReceiver(incoming));
                t.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}