package net.mcbbs.client.main.server.cmd;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Objects;

public class Command {
    public String sourceCommand;

    public CommandType type;
    public String pkg;
    public String subCommand;
    public String state;
    public ArrayList<String> arguments = new ArrayList<>();


    public Command(String str) throws CommandParseException {
        this.sourceCommand = str;

            String[] paths = str.split(" ");
            switch (CommandType.valueOf(paths[0])) {
                case EXECUTE:
                    this.type = CommandType.EXECUTE;
                    if (paths.length < 3) throw new CommandParseException(this);
                    this.pkg = paths[1];
                    this.subCommand = paths[2];
                    if (paths.length > 4)
                        for (int i = 5; i < paths.length; ++i)
                            this.arguments.add(paths[i]);
                    break;
                case DATA:
                    this.type = CommandType.DATA;
                    if (paths.length < 3) throw new CommandParseException(this);
                    this.pkg = paths[2];
                    this.subCommand = paths[3];
                    this.state = paths[4];
                    if (paths.length > 4)
                        for (int i = 5; i < paths.length; ++i)
                            this.arguments.add(paths[i]);
                    break;
                default:
                    throw new CommandParseException(this);
            }
    }

    // TODO 重构构造函数
    public Command(CommandType type, String pkg, String subCommand) {
        this.type = type;
        this.pkg = pkg;
        this.subCommand = subCommand;
    }

    public Command(CommandType type, String pkg, String subCommand, String[] args) {
        this.type = type;
        this.pkg = pkg;
        this.subCommand = subCommand;
        Collections.addAll(arguments, args);
    }

    public Command(CommandType type, String subCommand) {
        this(type, "", subCommand);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Command that = (Command) o;
        switch (this.type) {
            case EXECUTE:
                return this.pkg.equals(that.pkg) && this.subCommand.equals(that.subCommand);
            case DATA:
                return this.pkg.equals(that.pkg) && this.subCommand.equals(that.subCommand) && this.state.equals(that.state);
            default:
                return false;
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(sourceCommand, type, pkg, subCommand, arguments);
    }
}