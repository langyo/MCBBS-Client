package net.mcbbs.client.socketserver;

import java.io.IOException;

/**
 * @author langyo
 */
public class CommandParseException extends IOException {
    public CommandParser obj;

    public CommandParseException(CommandParser obj) {
        this.obj = obj;
    }

    public String generateFailCommand() {
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append("fail").append(this.obj.route.toString());
        return str.toString();
    }
}