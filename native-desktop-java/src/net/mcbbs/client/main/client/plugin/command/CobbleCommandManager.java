package net.mcbbs.client.main.client.plugin.command;

import com.google.common.collect.Maps;
import com.google.common.collect.Multimap;
import com.google.common.collect.MultimapBuilder;
import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.command.ICommandManager;
import net.mcbbs.client.api.plugin.command.IPluginCommand;

import java.util.Map;

public class CobbleCommandManager implements ICommandManager {
    private final Multimap<String,BoxedCommand> commands = MultimapBuilder.hashKeys().hashSetValues().build();
    private final class BoxedCommand {

        private final Map<String,BoxedCommand> childCommands = Maps.newHashMap();

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

        public int hashCode(){
            return name.hashCode()+command.hashCode();
        }

        public boolean equals(Object o){
            if(o instanceof BoxedCommand){
                return ((BoxedCommand) o).name.contentEquals(name)&&((BoxedCommand) o).command.equals(command);
            }
            return false;
        }

        public BoxedCommand getChildCommand(String name){
            return childCommands.get(name);
        }
    }
    @Override
    public <T, R> void provide(String pluginId, String commandName, IPluginCommand<T, R> command) {
        assert pluginId!=null&&commandName!=null;
        commands.put(commandName,new BoxedCommand(commandName,command));
    }

    @Override
    public <T, R> void provideChildCommand(String pluginId, String commandName, String childCommandName, IPluginCommand<T, R> type) {

    }

    @Override
    public IPluginCommand<?, ?> require(String pluginId,String commandName) {
        return commands.get(pluginId).stream().filter(cmd->cmd.name.contentEquals(commandName)).findAny().orElseThrow(IllegalArgumentException::new).getCommand();
    }

    @Override
    public IPluginCommand<?, ?> requireChildCommand(String pluginId, String commandName, String childCommandName) {
        return null;
    }
}
