package net.mcbbs.client.api.plugin.mapper;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.util.InvocationHandlerFactory;

public interface MapperManager {
    <I extends IPlugin, T> Mapper<T> createMapper(Class<I> plugin, String name, InvocationHandlerFactory factory);

    <I extends IPlugin, T> Mapper<T> getMapper(Class<I> plugin, String name);
}
