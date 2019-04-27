package net.mcbbs.client.api.plugin.mapper;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.util.InvocationHandlerFactory;

public interface MapperFactory {
    <I extends IPlugin>Mapper<I> createMapper(InvocationHandlerFactory factory);
}
