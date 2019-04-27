package net.mcbbs.client.api.plugin.mapper;

import net.mcbbs.client.api.plugin.IPlugin;

import java.lang.reflect.Method;
import java.util.function.Function;

public interface Mapper<I extends IPlugin> {
    void mapMethod(Method raw, Method mapped, Function<Object[],Object[]> argumentMapper,Object instance);
    void unmapMethod(Method raw);
    I mapped(Class<I> clz);
    enum Type{
        METHOD,VARIABLE
    }
}
