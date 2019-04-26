package net.mcbbs.client.main.client.cmd;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class SystemCommandDashboard {
    public static final String nativeVersionInfo = "java";

    private static Set<String> registered = new HashSet<>();

    public static void eval(SystemCommandType command, String[] extraArgs, CommandRoute route) throws IOException {
        switch (command) {
            case CALL:
                PluginDashboard.system(route.reverse(), SystemCommandType.RECEIVE.getType(), nativeVersionInfo);
                registered.add(extraArgs[0]);
                break;
            case RECEIVE:
                registered.add(extraArgs[0]);
                break;
            case EXIT:
                if (registered.contains(extraArgs[0])) {
                    PluginDashboard.callback(route.reverse(), "got", "system", "exit");
                    System.exit(0);
                } else {
                    PluginDashboard.callback(route.reverse(), "fail", "system", "exit");
                }
                break;
            default:
                //throw new CommandExecuteException();
                // TODO: 这里抛出的异常需要参数，以后找时间根据 command 的类型现场构造一个 Command 对象传进异常类里
        }
    }
}