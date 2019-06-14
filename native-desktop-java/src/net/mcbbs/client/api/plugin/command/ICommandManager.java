package net.mcbbs.client.api.plugin.command;

public interface ICommandManager {
    <T, R> void provide(String pluginId, String commandName, IPluginCommand<T, R> type);
    <T, R> void provideChildCommand(String pluginId, String commandName, String childCommandName, IPluginCommand<T, R> type);
    IPluginCommand<?, ?> require(String pluginId, String commandName);
    IPluginCommand<?, ?> requireChildCommand(String pluginId, String commandName, String childCommandName);
}
