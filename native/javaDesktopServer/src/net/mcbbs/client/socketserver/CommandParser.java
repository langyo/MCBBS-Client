package net.mcbbs.client.socketserver;

import java.util.ArrayList;
import java.util.Objects;

import static net.mcbbs.client.socketserver.CommandType.*;

public class CommandParser {
    public CommandType type;
    public String sourceCommand;

    public CommandType command;
    public CommandRoute route;
    public String pkg;
    public String subCommand;
    public ArrayList<String> arguments = new ArrayList<>();


    public CommandParser(String str) throws CommandParseException {
        this.sourceCommand = str;
        try {
            String[] paths = str.split(" ");
            switch (paths[0]) {
                case EXECUTE:
                    this.command = EXECUTE;
                    if (paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[1]);
                    this.pkg = paths[2];
                    this.subCommand = paths[3];
                    if (paths.length > 3)
                        for (int i = 4; i < paths.length; ++i)
                            this.arguments.add(paths[i]);
                    break;
                case DATA:
                    this.command = DATA;
                    if (paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[1]);
                    this.pkg = paths[2];
                    this.subCommand = paths[3];
                    if (paths.length > 3)
                        for (int i = 4; i < paths.length; ++i)
                            this.arguments.add(paths[i]);
                    break;
                case LOG:
                    this.command = LOG;
                    if (paths.length < 3) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[1], CommandRoute.BROADCAST_FLAG);
                    this.arguments.add(paths[2]);   // 时间
                    this.arguments.add(paths[3]);   // 内容
                    break;
                case SYSTEM:
                    this.command = SYSTEM;
                    if (paths.length < 2) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[1]);
                    this.subCommand = paths[3];
                    if (paths.length > 2)
                        for (int i = 3; i < paths.length; ++i)
                            this.arguments.add(paths[i]);
                    break;
                case CALLBACK:
                    this.command = CALLBACK;
                    if (paths.length < 4) throw new CommandParseException(this);
                    this.route = new CommandRoute(paths[2], CommandRoute.BROADCAST_FLAG);
                    this.pkg = paths[4];    // 实际保存的是源命令名（command）
                    this.subCommand = paths[3]; // 实际保存的是源命令下的子命令（subCommand）
                    this.arguments.add(paths[1]);   // 实际保存的是 got/fail
                    break;
                default:
                    throw new CommandParseException(this);
            }
        } catch (CommandRouteException e) {
            throw new CommandParseException(this);
        }
    }

}

    public CommandParser(CommandType type, CommandRoute route, String pkg, String subCommand) {
        this.type = type;
        this.route = route;
        this.pkg = pkg;
        this.subCommand = subCommand;
    }

    public CommandParser(CommandType type, CommandRoute route, String subCommand) {
        this(type, route, "", subCommand);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        // 这里的 equals 比较智能，因为它能根据不同的指令类型选择比较需要比较的内容，而不是盲目地全部比较一遍
        CommandParser that = ((CommandParser) o);
        switch (this.command) {
            case EXECUTE:
            case DATA:
            case CALLBACK:
                return this.pkg.equals(that.pkg) && this.route.equals(that.route) && this.subCommand.equals(that.subCommand);
            case SYSTEM:
                return this.route.equals(that.route) && this.subCommand.equals(that.subCommand);
            case LOG: {
                return true;
            }
            default: {
                return false;
            }
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.pkg, this.command, this.route, this.subCommand);
    }
}