package net.mcbbs.client.socketserver;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class SystemCommandDashboard {
    public static final String nativeVersionInfo = "java";

    private static Set<String> registed = new HashSet<>();

    public static void eval(SystemCommandType command, String[] extraArgs, CommandRoute route) throws IOException {
        switch (command) {
            case CALL:
                PluginDashboard.system(route.reverse(), SystemCommandType.RECEIVE.getType(), nativeVersionInfo);
                registed.add(extraArgs[0]);
                break;
            case RECEIVE:
                registed.add(extraArgs[0]);
                break;
            case EXIT:
                if (registed.contains(extraArgs[0])) {
                    PluginDashboard.callback(route.reverse(), "got", "system", "exit");
                    System.exit(0);
                } else {
                    PluginDashboard.callback(route.reverse(), "fail", "system", "exit");
                }
                break;
            default: {
                //fixme: there is no command!
                throw new CommandExecuteException();
            }
        }
    }
}