package net.mcbbs.client.api.plugin;

import net.mcbbs.client.api.plugin.meta.PluginMetadata;
import net.mcbbs.client.api.plugin.service.Service;

import javax.annotation.Nullable;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public final class BoxedPlugin<T extends IPlugin> {
    protected final List<Service<?,?>> services;
    protected final Map<String,IPluginCommand<?,?>> commands;
    protected final T plugin;
    protected final PluginMetadata metadata;
    public BoxedPlugin(T base,PluginMetadata meta,Service<?,?>[] services,Map<String,IPluginCommand<?,?>> commands){
        plugin = base;
        metadata = meta;
        this.commands = Collections.unmodifiableMap(commands);
        this.services = Arrays.asList(services);
    }

    @Nullable
    public Service<?,?> getService(String id){
        return services.stream().filter(service -> service.name().contentEquals(id)).findAny().orElse(null);
    }

    @Nullable
    public IPluginCommand<?,?> getCommand(String id){
        return commands.get(id);
    }
}
