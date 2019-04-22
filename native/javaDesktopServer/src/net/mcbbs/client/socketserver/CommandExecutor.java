package net.mcbbs.client.socketserver;

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

    private void doData() throws CommandExecuteException {
        if (!(PackageManager.packages.containsKey(command.pkg)
                && PackageManager.packages.get(command.pkg).dataListeners.containsKey(command.subCommand)))
            throw new CommandExecuteException(command);

        evalCommand(PackageManager.packages.get(command.pkg).dataListeners.get(command.subCommand));
    }

    private void doLog() {
        // 转交给专用类处理
        Logger.eval(command.arguments.get(0), (command.route.direction.getDirection().contentEquals("->") ? command.route.first : command.route.second).getSourceName(), command.arguments.get(1));
    }

    private void doSystem() throws IOException {
        // 转交给专用类处理
        SystemCommandDashboard.eval(SystemCommandType.valueOf(command.subCommand.toUpperCase()), (String[]) command.arguments.toArray(), command.route);
    }

    private void doCallback() {
        Command equaling = new Command(command.type, command.route, command.pkg, command.subCommand);
        PluginDashboard.tasks.remove(equaling);
    }

    public void execute() throws IOException {
        if (Objects.equals(command.route.getTo().getSourceName(), SystemCommandDashboard.nativeVersionInfo)) {
            switch (command.type) {
                case EXECUTE:
                    doExecute();
                    break;
                case DATA:
                    doData();
                    break;
                case LOG:
                    doLog();
                    break;
                case SYSTEM:
                    doSystem();
                    break;
                case CALLBACK:
                    doCallback();
                    break;
                default:
                    throw new CommandExecuteException(command);
            }
        } else {
            // 转发到别的平台
            switch (command.type) {
                case EXECUTE:
                    PluginDashboard.execute(command.route, command.pkg, command.type.getTypeName(), (String[]) command.arguments.toArray());
                    break;
                case DATA:
                    PluginDashboard.data(command.route, command.pkg, command.type.getTypeName(), command.arguments.toArray(new String[0]));
                    break;
                case SYSTEM:
                    //command arguments join with " " by yys
                    PluginDashboard.system(command.route, command.type.getTypeName(), String.join(" ", command.arguments));
                    break;
                case LOG:
                    PluginDashboard.log(command.route, command.arguments.get(0), command.arguments.get(1));
                    break;
                case CALLBACK:
                    if (command.pkg != null) {
                        PluginDashboard.callback(command.route, command.arguments.get(0), command.pkg, command.subCommand);
                    } else {
                        PluginDashboard.callback(command.route, command.arguments.get(0), command.subCommand);
                    }
                    break;
                default:
                    throw new CommandExecuteException(command);
            }
        }
    }

    private void evalCommand(PluginCommandListener method) {
        if (method.isArrayArguments()) {
            String[] args = new String[command.arguments.size()];
            command.arguments.toArray(args);
            method.trigger(args, command.route);
        } else {
            CommandBuilder str = new CommandBuilder();
            for (String s : command.arguments) str.append(s);
            method.trigger(str.toString(), command.route);
        }
    }
}