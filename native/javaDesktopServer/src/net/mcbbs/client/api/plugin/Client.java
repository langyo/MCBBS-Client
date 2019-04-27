package net.mcbbs.client.api.plugin;

import com.google.inject.Inject;
import net.mcbbs.client.api.plugin.service.ServiceManager;

import java.util.List;
import java.util.Map;

public abstract class Client {
    private Client(){}
    @Inject
    private static Client clientImpl;
    public static Client getClient(){
        return clientImpl;
    }

    @Inject
    private static ServiceManager smImpl;
    public static ServiceManager getServiceManager(){
        return smImpl;
    }

    @Inject
    private static List<BoxedPlugin<? extends IPlugin>> plugins;
    public static BoxedPlugin<?> getPlugin(String pluginId){
        return plugins.stream().filter(plugin->plugin.metadata.id.contentEquals(pluginId)).findAny().orElse(null);
    }
}
