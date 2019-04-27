package net.mcbbs.client.main.client.cmd;

import java.io.IOException;

public class CommandExecuteException extends IOException {
    public Command obj;

    public CommandExecuteException(Command obj) {
        this.obj = obj;
    }

    public String generateFailCommand() {
        if (obj != null) {
            CommandBuilder str = new CommandBuilder();
            str.append("callback").append("fail");
            str.append(this.obj.type.getTypeName()).append(this.obj.pkg).append(this.obj.subCommand);
            return str.toString();
        }
        return "";
    }
}