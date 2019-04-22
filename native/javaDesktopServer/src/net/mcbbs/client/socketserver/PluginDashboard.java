package net.mcbbs.client.socketserver;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class PluginDashboard {
    public static Set<Command> tasks = new HashSet<>();

    public static void execute(CommandRoute route, String pkg, String command, String[] args) throws IOException {
        CommandBuilder argStr = new CommandBuilder();
        for (String n : args) argStr.append(n);
        execute(route, pkg, command, argStr.toString());
    }

    public static void execute(CommandRoute route, String pkg, String command, String args) throws IOException {
        CommandBuilder str = new CommandBuilder();
        str.append("execute").append(route.toString()).append(pkg).append(command).append(args);
        SocketManager.sendMessage(str.toString());
        Command p = new Command(CommandType.EXECUTE, route, pkg, command, new String[]{args});
        tasks.add(p);
    }

    public static void data(CommandRoute route, String pkg, String command, String[] args) throws IOException {
        CommandBuilder argStr = new CommandBuilder();
        for (String n : args) argStr.append(n);
        execute(route, pkg, command, argStr.toString());
    }

    public static void data(CommandRoute route, String pkg, String command, String args) throws IOException {
        CommandBuilder str = new CommandBuilder();
        str.append("data").append(route.toString()).append(pkg).append(command).append(args);
        SocketManager.sendMessage(str.toString());
        Command p = new Command(CommandType.DATA, route, pkg, command, new String[]{args});
        tasks.add(p);
    }

    public static void system(CommandRoute route, String command, String args) throws IOException {
        CommandBuilder str = new CommandBuilder();
        str.append("system").append(route.toString()).append(command).append(args);
        SocketManager.sendMessage(str.toString());
    }

    public static void log(CommandRoute route, String time, String info) throws IOException {
        CommandBuilder str = new CommandBuilder();
        str.append("log").append(route.toString()).append(time).append(info);
        SocketManager.sendMessage(str.toString());
    }

    public static void callback(CommandRoute route, String type, String pkg, String command) throws IOException {
        // type 只有 got/fail 两种
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append(type).append(route.toString()).append(pkg).append(command);
        SocketManager.sendMessage(str.toString());
    }

    public static void callback(CommandRoute route, String type, String command) throws IOException {
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append(type).append(route.toString()).append(command);
        SocketManager.sendMessage(str.toString());
    }
}