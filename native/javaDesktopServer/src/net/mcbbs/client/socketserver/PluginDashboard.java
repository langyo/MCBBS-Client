package net.mcbbs.client.socketserver;

import java.utils.*;

public class PluginDashboard {
    public static Set<CommandParser> tasks = new Set<>();

    public static void execute(CommandRoute route, String package, String command, String[] args) {
        CommandBuilder argStr = new CommandBuilder();
        for (String n : args) argStr.append(n);
        this.execute(route. package,command, argStr.toString());
    }

    public static void execute(CommandRoute route, String package, String command, String args) {
        CommandBuilder str = new CommandBuilder();
        str.append("execute").append(route.toString()).append(package).append(command).append(args);
        SocketManager.sendMessage(str.toString());
        CommandParser p = new CommandParser(CommandType.EXECUTE, router, package,command, args);
        this.tasks.add(p);
    }

    public static void data(CommandRoute route, String package, String command, String[] args) {
        CommandBuilder argStr = new CommandBuilder();
        for (String n : args) argStr.append(n);
        this.execute(route. package,command, argStr.toString());
    }

    public static void data(CommandRoute route, String package, String command, String args) {
        CommandBuilder str = new CommandBuilder();
        str.append("data").append(route.toString()).append(package).append(command).append(args);
        SocketManager.sendMessage(str.toString());
        CommandParser p = new CommandParser(CommandType.DATA, router, package,command, args);
        this.tasks.add(p);
    }

    public static void system(CommandRoute route, String command, String args) {
        CommandBuilder str = new CommandBuilder();
        str.append("system").append(route.toString()).append(command).append(args);
        SocketManager.sendMessage(str.toString());
    }

    public static void log(CommandRoute route, String time, String info) {
        CommandBuilder str = new CommandBuilder();
        str.append("log").append(route.toString()).append(time).append(info);
        SocketManager.sendMessage(str.toString());
    }

    public static void callback(CommandRoute route, String type, String package, String command) {
        // type 只有 got/fail 两种
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append(type).append(route.toString()).append(package).append(command);
        SocketManager.sendMessage(str.toString());
    }

    public static void callback(CommandRoute route, String type, String command) {
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append(type).append(route.toString()).append(command);
        SocketManager.sendMessage(str.toString());
    }
}