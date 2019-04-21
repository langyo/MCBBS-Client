package net.mcbbs.client.socketserver;

public class CommandExecuter {
    private CommandParser command;

    public CommandExecuter(CommandParser parsed) {
        command = parsed;
    }

    private void doExecute() throws CommandExecuteException {
        if (!(PackageManager.packages.containsKey(command.package)
         &&PackageManager.pacakges.get(command.package).commands.containsKey(command.subCommand)))
        throw new CommandExecuteException(command);

        evalCommand(PackageManager.packages.get(command.package).commands.get(command.subCommand));
    }

    private void doData() throws CommandExecuteException {
        if (!(PackageManager.packages.containsKey(command.package)
         &&PackageManager.pacakges.get(command.package).dataListeners.containsKey(command.subCommand)))
        throw new CommandExecuteException(command);

        evalCommand(PackageManager.packages.get(command.package).dataListeners.get(command.subCommand));
    }

    private void doLog() throws CommandExecuteException {
        // 转交给专用类处理
        try {
            Logger.eval(command.arguments[0], command.route.getFrom(), command.arguments[1]);
        } catch (IOException e) {
            throw new CommandExecuteException(command);
        }
    }

    private void doSystem() throws CommandExecuteException {
        // 转交给专用类处理
        SystemCommandDashboard.eval(command.subCommand, command.arguments, command.route);
    }

    private void doCallback() {
        CommandParser equaling = new CommandParser(command.type, command.route, command.package,command.subCommand);
        PluginDashboard.tasks.remove(equaling);
    }

    public void execute() throws CommandExecuteException {
        if (command.route.getTo() == SystemCommandDashboard.nativeVersionInfo) {
            switch (command.command) {
                case CommandType.EXECUTE:
                    doExecute();
                    break;
                case CommandType.DATA:
                    doData();
                    break;
                case CommandType.LOG:
                    doLog();
                    break;
                case CommandType.SYSTEM:
                    doSystem();
                    break;
                case CommandType.CALLBACK:
                    doCallback();
                    break;
                default:
                    throw new CommandExecuteException(command);
            }
        } else {
            // 转发到别的平台
            switch (command.command) {
                case CommandType.EXECUTE:
                    PluginDashboard.execute(command.route, command.package,command.command, command.arguments);
                    break;
                case CommandType.DATA:
                    PluginDashboard.data(command.route, command.package,command.command, command.arguments);
                    break;
                case CommandType.SYSTEM:
                    PluginDashboard.system(command.route, command.command, command.arguments);
                case CommandType.LOG:
                    PluginDashboard.log(command.route, command.arguments[0], command.arguments[1]);
                case CommandType.CALLBACK:
                    if (command.package !=null)PluginDashboard.callback(command.route, command.arguments[0], command.package,command.subCommand);
                    else PluginDashboard.callback(command.route, command.arguments[0], command.subCommand);
                default:
                    throw new CommandExecuteException(command);
            }
        }
    }

}