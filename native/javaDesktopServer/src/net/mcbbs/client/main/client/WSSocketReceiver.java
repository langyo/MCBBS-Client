package net.mcbbs.client.main.client;

import net.mcbbs.client.main.client.cmd.Command;
import net.mcbbs.client.main.client.cmd.CommandExecutor;
import net.mcbbs.client.main.client.cmd.CommandParseException;

import java.io.IOException;

public class WSSocketReceiver {
    public Command commandParse(String cmd){
        try {
            return new Command(cmd);
        } catch (CommandParseException e) {
            e.printStackTrace();
        }
        return null;
    }
    public String commandExecute(Command cmd){
        CommandExecutor ce = new CommandExecutor(cmd);
        try {
            ce.execute();
        } catch (IOException e) {
            e.printStackTrace();
            return ce.generateFailCommand();
        }
        return ce.generateGotCommand();
    }
}
