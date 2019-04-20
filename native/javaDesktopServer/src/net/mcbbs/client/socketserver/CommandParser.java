package net.mcbbs.client.socketserver;

import java.utils.*;

public class CommandParser
{
    public String sourceCommand;
    
    public CommandRoute route;
    public String package;
    public String subCommand;
    public ArrayList<String> arguments;

    public COmmandType command;

    public CommandParser(String str) throws COmmandParseException
    {
        try
        {
            String[] paths = str.split(" ");
            switch(paths[0])
            {
                case CommandType.EXECUTE:
                    this.command = CommandType.EXECUTE;
                    if(paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRouter(path[1]);
                    this.pacakge = paths[2];
                    this.subCommand = paths[3];
                    if(paths.length > 3)
                     for(int i = 4; i < path; ++i)
                     this.arguments.add(paths[i]);
                case CommandType.DATA:
                    // TODO
                case CommandType.LOG:
                    // TODO
                case CommandType.SYSTEM:
                    // TODO
                case COmmandType.CALLBACK:
                    // TODO
                default:
                    // TODO
            }
        }
    }
}