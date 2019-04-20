package net.mcbbs.client.socketserver;

import java.utils.*;

public class CommandBuilder
{
    private ArrayList<String> commands = new ArrayList<>();

    public CommandBuilder append(String s)
    {
        command.add(s);
        return this;
    }

    public String toString()
    {
        StringBuilder str = new StringBuilder();
        Iterator iter = commands.iterator();
        while(iter.hasNext())
        {
            str.append(iter.next());
            if(iter.hasNext()) str.append(" ");
        }
        return str.toString();
    }
}