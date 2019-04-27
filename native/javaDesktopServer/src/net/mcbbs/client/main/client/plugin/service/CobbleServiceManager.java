package net.mcbbs.client.main.client.plugin.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.service.ServiceManager;

import javax.annotation.Nonnull;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public class CobbleServiceManager implements ServiceManager {
    class Area{
        IPlugin plugin;
        Map<Class<?>,ServiceWrapper<?>> services;
        public Area(IPlugin plugin,Map<Class<?>,ServiceWrapper<?>> services){
            this.plugin=plugin;
            this.services=services;
        }
        public<T> void register(Class<T> clz,T service){
            services.put(clz,new DirectServiceWrapper<>(service));
        }
        public<T> void replace(IPlugin plugin,Class<T> clz,T service){
            services.replace(clz,new RedirectServiceWrapper<>(plugin,clz));
        }
    }
    private final List<Area> areaCreated = Lists.newArrayList();
    private final Function<IPlugin,Area> default_area_supplier = (plugin) -> {
        Area area = new Area(plugin, Maps.newHashMap());
        areaCreated.add(area);
        return area;
    };
    private Area getOrCreateArea(IPlugin plugin){
        return areaCreated
                .stream()
                .filter(a->a.plugin.equals(plugin))
                .findFirst()
                .orElse(default_area_supplier.apply(plugin));
    }
    @Override
    public <T> void provides(IPlugin plugin, Class<T> serviceClass, T serviceImpl) {
        areaCreated.stream().filter(area -> area.services.get(serviceClass) instanceof DirectServiceWrapper).forEach(area -> area.replace(plugin,serviceClass,serviceImpl));
        getOrCreateArea(plugin).register(serviceClass,serviceImpl);
    }

    @Override
    public <T> T require(Class<T> serviceClass) {
        //noinspection unchecked
        return (T) areaCreated.stream()
                .filter(area -> area.services.containsKey(serviceClass))
                .findAny()
                .orElseThrow(()->new UnsupportedOperationException("Required an unknown service!"))
                .services
                .get(serviceClass)
                .getService();
    }

    public interface ServiceWrapper<T> {
        T getService();
    }

    private class DirectServiceWrapper<T> implements ServiceWrapper<T> {
        T wrapped;
        public DirectServiceWrapper(@Nonnull T service){
            wrapped = service;
        }
        @Override
        public T getService() {
            return wrapped;
        }
    }

    private class RedirectServiceWrapper<T> implements ServiceWrapper<T> {
        IPlugin plugin;
        Class<T> service;
        public RedirectServiceWrapper(IPlugin plugin,Class<T> service){
            this.plugin=plugin;
            this.service=service;
        }

        @Override
        public T getService() {
            //noinspection unchecked
            return (T) getOrCreateArea(plugin).services.get(service).getService();
        }
    }
}
