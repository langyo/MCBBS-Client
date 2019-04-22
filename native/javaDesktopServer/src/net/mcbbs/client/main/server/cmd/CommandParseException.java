package net.mcbbs.client.main.server.cmd;

import java.io.IOException;

public class CommandParseException extends IOException {
    public Command obj;

    public CommandParseException(Command obj) {
        this.obj = obj;
    }

    public String generateFailCommand() {
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append("fail").append(this.obj.route.toString());
        return str.toString();
    }
}