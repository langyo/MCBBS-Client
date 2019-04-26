package net.mcbbs.client.api.plugin;

import com.google.common.collect.Maps;
import net.mcbbs.client.api.plugin.meta.PluginMetadata;
import net.mcbbs.client.api.plugin.service.Service;

import java.util.Map;

public final class BoxedPlugin<T extends IPlugin> {
    protected final Map<String,Service<?,?>> services = Maps.newHashMap();
    protected final T plugin;
    protected final PluginMetadata metadata;
    public BoxedPlugin(T base,PluginMetadata meta){
        plugin = base;
        metadata = meta;
    }

    public Service<?,?> getService(String id){
        return services.get(id);
    }


}
