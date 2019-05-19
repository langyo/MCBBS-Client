package net.mcbbs.client.api.plugin.command;

import net.mcbbs.client.api.plugin.IPlugin;

public interface ICommandManager {
    <T,R>void provide(IPlugin plugin,String commandName,IPluginCommand<T,R> type);
    IPluginCommand<?,?> require(String commandName);
}
