package net.mcbbs.client.socketserver;

import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class SocketReceiver implements Runnable {
    private Socket s;

    public SocketReceiver(Socket incoming) {
        s = incoming;
    }

    public void run() {
        try (
                Scanner in = new Scanner(s.getInputStream(), "UTF-8");
                PrintWriter out = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), StandardCharsets.UTF_8), true)
        ) {
            String command = in.nextLine();
            CommandParser parsed = new CommandParser(command);
            CommandExecuter executer = new CommandExecuter(parsed);
            executer.execute();
            out.println(executer.generateGotMessage());
        } catch (CommandParseException e) {
            out.println(e.generageFailMessage());
        } catch (ComamndExecuteException e) {
            out.println(e.generageFailMessage());
        } finally {
            s.close();
            return;
        }
    }
}