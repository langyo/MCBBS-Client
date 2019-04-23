package net.mcbbs.client.main.server.cmd;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class PluginDashboard {
    public static Set<Command> tasks = new HashSet<>();

    public static void execute(String pkg, String command, String[] args) throws IOException {
        CommandBuilder argStr = new CommandBuilder();
        for (String n : args) argStr.append(n);
        execute(pkg, command, argStr.toString());
    }

    public static void execute(String pkg, String command, String args) throws IOException {
        CommandBuilder str = new CommandBuilder();
        str.append("execute").append(pkg).append(command).append(args);
        SocketManager.sendMessage(str.toString());
        Command p = new Command(CommandType.EXECUTE, pkg, command, new String[]{args});
        tasks.add(p);
    }

    public static void data(String pkg, String command, String[] args) throws IOException {
        CommandBuilder argStr = new CommandBuilder();
        for (String n : args) argStr.append(n);
        execute(pkg, command, argStr.toString());
    }

    public static void data(String pkg, String command, String args) throws IOException {
        CommandBuilder str = new CommandBuilder();
        str.append("data").append(pkg).append(command).append(args);
        SocketManager.sendMessage(str.toString());
        Command p = new Command(CommandType.DATA, pkg, command, new String[]{args});
        tasks.add(p);
    }
}