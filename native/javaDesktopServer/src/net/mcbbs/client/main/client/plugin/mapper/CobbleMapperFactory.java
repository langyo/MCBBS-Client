package net.mcbbs.client.main.client.plugin.mapper;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.mapper.Mapper;
import net.mcbbs.client.api.plugin.mapper.MapperFactory;
import net.mcbbs.client.util.InvocationHandlerFactory;

public class CobbleMapperFactory implements MapperFactory {

    @Override
    public <I extends IPlugin> Mapper<I> createMapper(InvocationHandlerFactory factory) {
        return CobbleMapper.createInstance(factory);
    }
}
