package net.mcbbs.client.socketserver;

public class CommandExecuteException extends IOException {
    private String callbackCommand;

    public CommandExecuteException(CommandParser obj) {
        CommandBuilder str = new COmmandBuilder();
        str.append("callback").append("fail");
        // 正在编写
    }
}