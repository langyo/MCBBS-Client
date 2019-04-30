package net.mcbbs.client.api.plugin.event.construction;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.event.Event;
import net.mcbbs.client.api.plugin.mapper.Mapper;
import net.mcbbs.client.api.plugin.mapper.MapperManager;
import net.mcbbs.client.main.client.plugin.loading.PluginLoader;
import net.mcbbs.client.main.client.plugin.loading.PluginLoaderVirtualRef;
import net.mcbbs.client.util.InvocationHandlerFactory;

public abstract class MappingEvent implements Event {
    public abstract PluginLoader source();

    public abstract MapperManager data();

    public static class Methods extends MappingEvent {
        private final PluginLoader source;
        private final MapperManager data;

        public Methods(PluginLoaderVirtualRef source, MapperManager data) {
            this.source = source;
            this.data = data;
        }

        @Override
        public PluginLoader source() {
            return source;
        }

        @Override
        public MapperManager data() {
            return data;
        }

        public <I extends IPlugin, T> Mapper<T> registerMapper(Class<I> pluginClz, String name, InvocationHandlerFactory factory) {
            return data.createMapper(pluginClz, name, factory);
        }

        public <I extends IPlugin, T> Mapper<T> getMapper(Class<I> pluginClz, String name) {
            return data.getMapper(pluginClz, name);
        }
    }
}
