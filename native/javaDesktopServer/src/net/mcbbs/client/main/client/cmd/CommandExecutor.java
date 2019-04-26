package net.mcbbs.client.main.client.cmd;

import java.io.IOException;
import java.util.Objects;

public class CommandExecutor {
    private Command command;

    public CommandExecutor(Command parsed) {
        command = parsed;
    }

    private void doExecute() throws CommandExecuteException {
        if (!(PackageManager.packages.containsKey(command.pkg)
                && PackageManager.packages.get(command.pkg).commands.containsKey(command.subCommand)))
            throw new CommandExecuteException(command);

        evalCommand(PackageManager.packages.get(command.pkg).commands.get(command.subCommand));
    }

    private void evalCommand(PluginCommandListener method) {
        if (method.isArrayArguments()) {
            method.trigger(command.arguments);
        } else {
            CommandBuilder str = new CommandBuilder();
            for (String s : command.arguments) str.append(s);
            method.trigger(str.toString());
        }
    }

    private void doData() throws CommandExecuteException {
        if (!(PackageManager.packages.containsKey(command.pkg)
                && PackageManager.packages.get(command.pkg).dataListeners.containsKey(command.subCommand)))
            throw new CommandExecuteException(command);

        evalCommand(PackageManager.packages.get(command.pkg).dataListeners.get(command.subCommand));
    }

    public void execute() throws IOException {
        switch (command.type) {
            case EXECUTE:
                doExecute();
                break;
            case DATA:
                doData();
                break;
            default:
                throw new CommandExecuteException(command);
        }
    }

    public String generateGotCommand() {
        return "callback got";
    }

    public String generateFailCommand() {
        return "callback fail";
    }
}