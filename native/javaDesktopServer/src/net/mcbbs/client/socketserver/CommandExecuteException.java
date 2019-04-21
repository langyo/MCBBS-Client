package net.mcbbs.client.socketserver;

import java.io.IOException;

public class CommandExecuteException extends IOException {
    public String obj;

    public CommandExecuteException() {
    }

    public CommandExecuteException(CommandParser obj) {
        this.obj = obj;
    }

    public String generateFailCommand() {
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append("fail").append(this.obj.route.toString());
        str.append(this.obj.command).append(this.obj.package).append(this.obj.subCommand);
        return str.toString();
    }
}