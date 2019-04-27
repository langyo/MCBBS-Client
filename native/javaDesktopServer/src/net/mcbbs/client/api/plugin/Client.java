package net.mcbbs.client.api.plugin;

import com.google.inject.Inject;
import com.google.inject.name.Named;
import net.mcbbs.client.api.plugin.service.ServiceManager;

import java.util.List;

public abstract class Client {
    private Client(){}

    @Inject
    @Named("service_manager")
    private static ServiceManager smImpl;
    public static ServiceManager getServiceManager(){
        return smImpl;
    }

    @Inject
    @Named("plugin_list")
    private static List<BoxedPlugin<? extends IPlugin>> plugins;
    public static BoxedPlugin<?> getPlugin(String pluginId){
        return plugins.stream().filter(plugin->plugin.metadata.id.contentEquals(pluginId)).findAny().orElse(null);
    }
}
