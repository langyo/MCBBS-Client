package net.mcbbs.client.api.plugin;

import com.google.inject.Inject;
import net.mcbbs.client.api.plugin.service.ServiceManager;

public abstract class Client {
    private Client(){}
    @Inject
    private static Client clientImpl;
    public static Client getClient(){
        return clientImpl;
    }

    @Inject
    private static ServiceManager smImpl;
    public ServiceManager getServiceManager(){
        return smImpl;
    }
}
