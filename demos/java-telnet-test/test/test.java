import java.io.*;
import java.net.*;
import java.util.*;

public class test
{
    public static void main(String[] args)
    {
        System.out.println("Launch!");
        try{
            ServerSocket s = new ServerSocket(9233);
            Socket server = s.accept();

            InputStream inS = server.getInputStream();
            OutputStream outS = server.getOutputStream();

            Scanner in = new Scanner(inS, "UTF-8");
            PrintWriter out = new PrintWriter(new OutputStreamWriter(outS, "UTF-8"), true);

            out.println("TestS");
            String line = in.nextLine();
            out.println(line);
            System.out.println(line);
            server.close();
        }
        catch(IOException e){}
    }
}