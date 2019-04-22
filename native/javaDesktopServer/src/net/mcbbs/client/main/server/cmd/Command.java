package net.mcbbs.client.main.server.cmd;

import java.util.ArrayList;
import java.util.Collections;

public class Command {
    public String sourceCommand;

    public CommandType type;
    public CommandRoute route;
    public String pkg;
    public String subCommand;
    public ArrayList<String> arguments = new ArrayList<>();


    public Command(String str) throws CommandParseException {
        this.sourceCommand = str;
        try {
            String[] paths = str.split(" ");
            switch (CommandType.valueOf(paths[0])) {
                case EXECUTE:
                    this.type = CommandType.EXECUTE;
                    if (paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[1]);
                    this.pkg = paths[2];
                    this.subCommand = paths[3];
                    if (paths.length > 4)
                        for (int i = 5; i < paths.length; ++i)
                            this.arguments.add(paths[i]);
                    break;
                case DATA:
                    this.type = CommandType.DATA;
                    if (paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[1]);
                    this.pkg = paths[2];
                    this.subCommand = paths[3];
                    if (paths.length > 4)
                        for (int i = 5; i < paths.length; ++i)
                            this.arguments.add(paths[i]);
                    break;
                case LOG:
                    this.type = CommandType.LOG;
                    if (paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[1], CommandRoute.getBroadcastFlag());
                    this.arguments.add(paths[2]);   // 时间
                    this.arguments.add(paths[3]);   // 内容
                    break;
                case SYSTEM:
                    this.type = CommandType.SYSTEM;
                    if (paths.length < 2) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[1]);
                    this.subCommand = paths[3];
                    if (paths.length > 4)
                        for (int i = 3; i < paths.length; ++i)
                            this.arguments.add(paths[i]);
                    break;
                case CALLBACK:
                    this.type = CommandType.CALLBACK;
                    if (paths.length < 4) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[2], CommandRoute.getBroadcastFlag());
                    this.pkg = paths[4];    // 实际保存的是源命令名（type）
                    this.subCommand = paths[3]; // 实际保存的是源命令下的子命令（subCommand）
                    this.arguments.add(paths[1]);   // 实际保存的是 got/fail
                    break;
                default:
                    throw new CommandParseException(this);
            }
        } catch (CommandParseException e) {
            throw e;
        } catch (CommandRouteException e) {
            throw new CommandParseException(this);
        }
    }

    public Command(CommandType type, CommandRoute route, String pkg, String subCommand) {
        this.type = type;
        this.route = route;
        this.pkg = pkg;
        this.subCommand = subCommand;
    }

    public Command(CommandType type, CommandRoute route, String pkg, String subCommand, String[] args) {
        this.type = type;
        this.route = route;
        this.pkg = pkg;
        this.subCommand = subCommand;
        Collections.addAll(arguments, args);
    }

    public Command(CommandType type, CommandRoute route, String subCommand) {
        this(type, route, "", subCommand);
    }

    public boolean equals(Command n) {
        // 这里的 equals 比较智能，因为它能根据不同的指令类型选择比较需要比较的内容，而不是盲目地全部比较一遍
        switch (this.type) {
            case EXECUTE:
            case DATA:
            case CALLBACK:
                return this.pkg == n.pkg && this.route.equals(n.route) && this.subCommand == n.subCommand;
            case SYSTEM:
                return this.route.equals(n.route) && this.subCommand == n.subCommand;
            case LOG:
                return true;
            default:
                return false;
        }
    }
}