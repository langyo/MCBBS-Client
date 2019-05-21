import java.io.*;
import java.net.*;
import java.util.*;

public class test
{
    public static void main(String[] args)
    {
        System.out.println("Launcher!");
        try{
            Socket s = new Socket("localhost", 9233);

            Scanner in = new Scanner(s.getInputStream(), "UTF-8");
            PrintWriter out = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), "UTF-8"), true);

            out.println("TestC");
            out.flush();
            s.shutdownOutput();
            
            String line = in.nextLine();
            System.out.println(line);

            s.close();
        }
        catch(IOException e){}
    }
}