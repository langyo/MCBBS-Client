package net.mcbbs.client.api.plugin.event.construction;

import net.mcbbs.client.api.plugin.event.Event;
import net.mcbbs.client.api.plugin.mapper.MapperManager;
import net.mcbbs.client.main.client.plugin.loading.PluginLoader;

public abstract class MappingEvent implements Event {
    public abstract PluginLoader source();
    public abstract MapperManager data();
    public static class Methods extends MappingEvent {
        private final PluginLoader source;
        private final MapperManager data;
        public Methods(PluginLoader source, MapperManager data){
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
    }
}
