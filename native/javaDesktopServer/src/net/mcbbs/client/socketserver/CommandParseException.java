package net.mcbbs.client.socketserver;

public class CommandParseException extends IOException
{
    private String callbackCommand;
    public CommandParseException(CommandParser obj)
    {
        CommandBuilder str = new COmmandBuilder();
        str.append("callback").append("fail");
        // 正在编写
    }
}