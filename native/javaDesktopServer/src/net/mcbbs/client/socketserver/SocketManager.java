package net.mcbbs.client.socketserver;

import java.net.*;
import java.io.*;

public class SocketManager
{
    public static String sendMessage(String msg)
    {
        try(
            Socket s = new Socket("localhost", 9234);
            Scanner in = new Scanner(s.getInputStream(), "UTF-8");
            PrintWriter out = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), "UTF-8"), true);
        ){
            out.print(msg);
            out.flush();
            s.shutdownOutput();
            return in.nextLine();
        }
    }

    // Java 端的 main 在处理完其它杂事后，执行此方法，让主线程死循环
    public static void receiveMessage()
    {
        try(
            ServerSocket s = new ServerSocket(9233);
        ){
            while(true)
            {
                Socket incoming = s.accept();
                Thread t = new Thread(new SocketReceiver(incoming));
                t.start();
            }
        }catch(IOException e)
        {
            e.printStackTrace();
        }
    }
}