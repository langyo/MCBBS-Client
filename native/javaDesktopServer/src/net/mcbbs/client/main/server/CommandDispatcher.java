package net.mcbbs.client.main.server;

import static java.lang.System.out;

public final class CommandDispatcher {
    public static void dispatch(String cmd) {
        String[] cmdSeparated = cmd.split(" ");
        switch (cmdSeparated[0]) {
            case "log": {
                String log = cmd.substring(3);
                out.println(log);
                break;
            }
            default: {
                break;
            }
        }
    }
}
