package net.mcbbs.client.main.client.cmd;

import java.util.List;

public interface PluginCommandListener {
    String trigger(String args, CommandRoute route);

    String trigger(List<String> args, CommandRoute route);

    /**
     * 参数是否是数组
     *
     * @return 如果是数组返回true
     */
    default boolean isArrayArguments() {
        return false;
    }
}