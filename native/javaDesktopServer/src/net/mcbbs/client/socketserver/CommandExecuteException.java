package net.mcbbs.client.socketserver;

import java.io.IOException;

public class CommandExecuteException extends IOException
{
    public Command obj;
    public CommandExecuteException(Command obj)
    {
        this.obj = obj;
    }

    public String generateFailCommand() {
        CommandBuilder str = new CommandBuilder();
        str.append("callback").append("fail").append(this.obj.route.toString());
        str.append(this.obj.type.getTypeName()).append(this.obj.pkg).append(this.obj.subCommand);
        return str.toString();
    }
}