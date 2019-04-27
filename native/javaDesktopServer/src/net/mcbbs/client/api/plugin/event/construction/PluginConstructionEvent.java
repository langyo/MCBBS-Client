package net.mcbbs.client.api.plugin.event.construction;

import net.mcbbs.client.api.plugin.event.Event;
import net.mcbbs.client.api.plugin.meta.PluginMetadata;
import net.mcbbs.client.main.client.plugin.loading.PluginLoader;

public class PluginConstructionEvent implements Event {
    private final PluginLoader source;
    private final String loaderInfo;
    public PluginConstructionEvent(PluginLoader source,String info){
        this.source=source;
        loaderInfo=info;
    }
    @Override
    public PluginLoader source() {
        return source;
    }

    @Override
    public String data() {
        return loaderInfo;
    }
}
