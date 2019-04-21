package net.mcbbs.client.socketserver;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class SocketReceiver implements Runnable {
    private Socket s;

    public SocketReceiver(Socket incoming) {
        s = incoming;
    }

    public void run() {
        PrintWriter out;
        try {
            out = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), StandardCharsets.UTF_8), true);
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }
        try (
                Scanner in = new Scanner(s.getInputStream(), "UTF-8");
        ) {
            String command = in.nextLine();
            Command parsed = new Command(command);
            CommandExecuter executer = new CommandExecuter(parsed);
            executer.execute();
            out.println(executer.generateGotCommand());
        } catch (CommandParseException e) {
            out.println(e.generateFailCommand());
        } catch (CommandExecuteException e) {
            out.println(e.generateFailCommand());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                s.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}