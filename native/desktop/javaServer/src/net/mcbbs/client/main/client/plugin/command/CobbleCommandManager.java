package net.mcbbs.client.main.client.plugin.command;

import com.google.common.collect.Maps;
import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.command.ICommandManager;
import net.mcbbs.client.api.plugin.command.IPluginCommand;

import java.util.Map;

public class CobbleCommandManager implements ICommandManager {
    Map<String,IPluginCommand> commandMap = Maps.newHashMap();
    @Override
    public <T, R> void provide(IPlugin plugin, String commandName, IPluginCommand<T, R> command) {
        assert plugin!=null;
        commandMap.put(commandName,command);
    }

    @Override
    public IPluginCommand<?, ?> require(String commandName) {
        return commandMap.get(commandName);
    }
}
