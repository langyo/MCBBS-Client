package net.mcbbs.client.api.plugin.mapper;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.util.InvocationHandlerFactory;

public interface MapperManager {
    <I extends IPlugin>Mapper<I> createMapper(Class<I> clz,String name,InvocationHandlerFactory factory);
    <I extends IPlugin>Mapper<I> getMapper(Class<I> plugin,String name);
}
