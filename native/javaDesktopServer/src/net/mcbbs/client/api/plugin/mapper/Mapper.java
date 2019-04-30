package net.mcbbs.client.api.plugin.mapper;

import java.lang.reflect.Method;
import java.util.function.Function;

public interface Mapper<I> {
    Mapper<I> mapMethod(Method raw, Method mapped, Function<Object[], Object[]> argumentMapper, Object instance);

    Mapper<I> unmapMethod(Method raw);

    I mapped(Class<I> clz);

    String name();

    enum Type {
        METHOD, VARIABLE
    }
}
