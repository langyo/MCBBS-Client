package net.mcbbs.client.socketserver;

import java.util.*;

public class PluginDashboard
{
    public static Set<Command> tasks = new HashSet<>();

    public static void execute(CommandRoute route, String pkg, String command, String[] args)
    {
        CommandBuilder argStr = new CommandBuilder();
        for(String n : args) argStr.append(n);
        execute(route, pkg, command, argStr.toString());
    }

    public static void execute(CommandRoute route, String pkg, String command, String args)
    {
        CommandBuilder str = new CommandBuilder();
        str.append("execute").append(route.toString()).append(pkg).append(command).append(args);
        SocketManager.sendMessage(str.toString());
        Command p = new Command(CommandType.EXECUTE, route, pkg, command, new String[]{args});
        tasks.add(p);
    }

    public static void data(CommandRoute route, String pkg, String command, String[] args)
    {
        CommandBuilder argStr = new CommandBuilder();
        for(String n : args) argStr.append(n);
        execute(route, pkg, command, argStr.toString());
    }

    public static void data(CommandRoute route, String pkg, String command, String args)
    {
        CommandBuilder str = new CommandBuilder();
        str.append("data").append(route.toString()).append(pkg).append(command).append(args);
        SocketManager.sendMessage(str.toString());
        Command p = new Command(CommandType.DATA, route, pkg, command, new String[]{args});
        tasks.add(p);
    }

    public static void system(CommandRoute route, String command, String args) 
    {
        CommandBuilder str = new CommandBuilder();
        str.append("system").append(route.toString()).append(command).append(args);
        SocketManager.sendMessage(str.toString());
    }

    public static void log(CommandRoute route, String time, String info)
    {
        CommandBuilder str = new CommandBuilder();
        str.append("log").append(route.toString()).append(time).append(info);
        SocketManager.sendMessage(str.toString());
    }

    public static void callback(CommandRoute route, String type, String pkg, String command)
    {
        // type 只有 got/fail 两种
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append(type).append(route.toString()).append(pkg).append(command);
        SocketManager.sendMessage(str.toString());
    }

    public static void callback(CommandRoute route, String type, String command)
    {
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append(type).append(route.toString()).append(command);
        SocketManager.sendMessage(str.toString());
    }
}