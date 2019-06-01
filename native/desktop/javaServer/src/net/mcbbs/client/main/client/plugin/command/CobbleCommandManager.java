package net.mcbbs.client.main.client.plugin.command;

import com.google.common.collect.Multimap;
import com.google.common.collect.MultimapBuilder;
import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.command.ICommandManager;
import net.mcbbs.client.api.plugin.command.IPluginCommand;

public class CobbleCommandManager implements ICommandManager {
    private final Multimap<String,BoxedCommand> commands = MultimapBuilder.hashKeys().hashSetValues().build();
    private final class BoxedCommand {
        public BoxedCommand(String name, IPluginCommand command) {
            this.name = name;
            this.command = command;
        }
        private final String name;
        private final IPluginCommand command;

        public String getName() {
            return name;
        }

        public IPluginCommand getCommand() {
            return command;
        }
    }
    private final class Scope {

    }
    @Override
    public <T, R> void provide(String pluginId, String commandName, IPluginCommand<T, R> command) {
        assert ;
        commandMap.put(commandName,command);
    }

    @Override
    public IPluginCommand<?, ?> require(String pluginId,String commandName) {
        return commandMap.get(commandName);
    }
}
