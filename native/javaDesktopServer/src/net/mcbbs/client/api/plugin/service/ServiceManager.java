package net.mcbbs.client.api.plugin.service;

import net.mcbbs.client.api.plugin.IPlugin;

public interface ServiceManager {
    <T> void provides(IPlugin plugin, Class<T> serviceClass, T serviceImpl);

    <T> T require(Class<T> serviceClass);
}
