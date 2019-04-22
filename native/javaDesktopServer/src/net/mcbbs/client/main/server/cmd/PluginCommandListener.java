package net.mcbbs.client.main.server.cmd;

import java.util.List;

public interface PluginCommandListener {
    String trigger(String args, CommandRoute route);

    String trigger(List<String> args, CommandRoute route);

    default boolean isArrayArguments() {
        return false;
    }
}