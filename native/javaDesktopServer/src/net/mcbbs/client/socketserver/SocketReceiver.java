package net.mcbbs.client.socketserver;

import java.net.*;
import java.io.*;

public class SocketReceiver implements Runnable
{
    private Socket s;
    public SocketReceiver(Socket incoming)
    {
        s = incoming;
    }
    public void run()
    {
        try(
            Scanner in = new Scanner(s.getInputStream(), "UTF-8");
            PrintWriter out = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), "UTF-8"), true);
        ){
            String command = in.nextLine();
            CommandParser parsed = new CommandParser(command);
            CommandExecuter executer = new CommandExecuter(parsed);
            executer.execute();
            out.println(executer.generateGotMessage());
        }
        catch(CommandParseException e)
        {
            out.println(e.generageFailMessage());
        }
        catch(ComamndExecuteException e)
        {
            out.println(e.generageFailMessage());
        }
        finally
        {
            s.close();
            return;
        }
    }
}