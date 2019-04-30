package net.mcbbs.client.api.plugin.event.construction;

import net.mcbbs.client.api.plugin.event.Event;
import net.mcbbs.client.main.client.plugin.loading.PluginLoader;
import net.mcbbs.client.main.client.plugin.loading.PluginLoaderVirtualRef;

import javax.annotation.Nonnull;

public abstract class PluginConstructionEvent implements Event {
    private final PluginLoader source;

    public PluginConstructionEvent(@Nonnull PluginLoaderVirtualRef source) {
        this.source = source;
    }

    @Override
    public PluginLoader source() {
        return source;
    }
    /*public static class ServiceMapping extends PluginConstructionEvent{
        private final ServiceManager manager;
        public ServiceMapping(PluginLoaderVirtualRef source, @Nonnull ServiceManager serviceManager) {
            super(source);
            manager=serviceManager;
        }

        @Override
        public ServiceManager data() {
            return manager;
        }

        public <T>void provides(IPlugin plugin, Class<T> serviceClass, T serviceImpl){
            manager.provides(plugin,serviceClass,serviceImpl);
        }
    }*/
}
