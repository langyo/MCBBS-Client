package net.mcbbs.client.socketserver;

import java.utils.*;

public class CommandParser
{
    public String sourceCommand;

    public CommandType command;
    public CommandRoute route;
    public String package;
    public String subCommand;
    public ArrayList<String> arguments = new ArrayList<>();


    public CommandParser(String str) throws COmmandParseException
    {
        this.sourceCommand = str;
        try
        {
            String[] paths = str.split(" ");
            switch(paths[0])
            {
                case CommandType.EXECUTE:
                    this.command = CommandType.EXECUTE;
                    if(paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRoute(path[1]);
                    this.pacakge = paths[2];
                    this.subCommand = paths[3];
                    if(paths.length > 3)
                     for(int i = 4; i < path; ++i)
                     this.arguments.add(paths[i]);
                    break;
                case CommandType.DATA:
                    this.command = CommandType.DATA;
                    if(paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRoute(path[1]);
                    this.pacakge = paths[2];
                    this.subCommand = paths[3];
                    if(paths.length > 3)
                     for(int i = 4; i < path; ++i)
                     this.arguments.add(paths[i]);
                    break;
                case CommandType.LOG:
                    this.command = CommandType.LOG;
                    if(paths.length < 3) throw new COmmandParseException(this);
                    this.route = new CommandRoute(path[1], CommandRoute.BROADCAST_FLAG);
                    this.arguments.add(paths[2]);   // 时间
                    this.arguments.add(paths[3]);   // 内容
                    break;
                case CommandType.SYSTEM:
                    this.command = CommandType.SYSTEM;
                    if(paths.length < 2) throw new CommandParseException(this);
                    this.route = new CommandRoute(path[1]);
                    this.subCommand = paths[3];
                    if(paths.length > 2)
                     for(int i = 3; i < path; ++i)
                     this.arguments.add(paths[i]);
                    break;
                case CommandType.CALLBACK:
                    this.command = CommandType.CALLBACK;
                    if(paths.length < 4) throw new CommandParseException(this);
                    this.route = new CommandRoute(path[2], CommandRoute.BROADCAST_FLAG);
                    this.pacakge = paths[4];    // 实际保存的是源命令名（command）
                    this.subCommand = paths[3]; // 实际保存的是源命令下的子命令（subCommand）
                    this.arguments.add(paths[1]);   // 实际保存的是 got/fail
                    break;
                default:
                    throw new CommandParseException(this);
            }
            catch(CommandParseException e)
            {
                throw e;
            }
            catch(CommandRouteException e)
            {
                throw new CommandParseException(this);
            }
        }
    }

    public CommandParser(CommandType type, CommandRoute route, String package, String subCommand)
    {
        this.type = type;
        this.route = route;
        this.package = package;
        this.subCommand = subCommand;
    }

    public CommandParser(CommandType type, CommandRoute route, String subCommand)
    {
        this(type, route, "", subCommand);
    }

    public bool equals(CommandParser n)
    {
        // 这里的 equals 比较智能，因为它能根据不同的指令类型选择比较需要比较的内容，而不是盲目地全部比较一遍
        switch(this.command)
        {
            case CommandType.EXECUTE:
            case CommandType.DATA:
            case CommandType.CALLBACK:
                return this.package == n.package && this.route.equals(n.route) && this.subCommand == n.subCommand;
            case CommandType.SYSTEM:
                return this.route.equals(n.route) && this.subCommand == n.subCommand;
            case CommandType.LOG:
                return true;
            default:
                return false;
        }
    }
}