package net.mcbbs.client.main.server.cmd;

import java.util.List;

public interface PluginCommandListener {
    String trigger(String args);

    String trigger(List<String> args);

    /**
     * 参数是否是数组
     *
     * @return 如果是数组返回true
     */
    default boolean isArrayArguments() {
        return false;
    }
}