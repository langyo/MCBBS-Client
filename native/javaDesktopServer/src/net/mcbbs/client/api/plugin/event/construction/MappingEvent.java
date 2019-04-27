package net.mcbbs.client.api.plugin.event.construction;

import net.mcbbs.client.api.plugin.event.Event;
import net.mcbbs.client.api.plugin.mapper.MapperFactory;
import net.mcbbs.client.main.client.plugin.loading.PluginLoader;

public abstract class MappingEvent implements Event {
    public abstract PluginLoader source();
    public abstract MapperFactory data();
    public static class Methods extends MappingEvent {
        private final PluginLoader source;
        private final MapperFactory data;
        public Methods(PluginLoader source,MapperFactory data){
            this.source = source;
            this.data = data;
        }
        @Override
        public PluginLoader source() {
            return source;
        }

        @Override
        public MapperFactory data() {
            return data;
        }
    }
}
