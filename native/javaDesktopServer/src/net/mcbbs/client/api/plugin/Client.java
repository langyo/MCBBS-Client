package net.mcbbs.client.api.plugin;

import com.google.common.collect.Maps;
import com.google.common.collect.Multimap;
import com.google.common.collect.MultimapBuilder;
import com.google.common.eventbus.EventBus;
import com.google.common.eventbus.Subscribe;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import net.mcbbs.client.api.plugin.event.Event;
import net.mcbbs.client.api.plugin.mapper.MapperManager;
import net.mcbbs.client.api.plugin.service.ServiceManager;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.StreamSupport;

public abstract class Client {
    private Client(){}

    @Inject
    @Named("service_manager")
    private static ServiceManager smImpl;
    public static ServiceManager getServiceManager(){
        return smImpl;
    }

    @Inject
    @Named("plugin_list")
    private static List<BoxedPlugin<? extends IPlugin>> plugins;
    public static BoxedPlugin<?> getPlugin(String pluginId){
        return plugins.stream().filter(plugin->plugin.metadata.id.contentEquals(pluginId)).findAny().orElse(null);
    }

    @Inject
    @Named("mapper_factory")
    private static MapperManager mapper_factory;
    public static MapperManager getMapperFactory() {
        return mapper_factory;
    }

    @Inject
    @Named("main_event_bus")
    private static EventBus main_event_bus;

    @Inject
    @Named("net_event_bus")
    private static EventBus net_event_bus;

    @Inject
    @Named("internal_event_bus")
    private static EventBus internal_event_bus;

    public static final class EventBusController{
        protected static final class BoxedHandler<T extends Event> {
            protected static final Map<Class<? extends Event>,Multimap<Class<?>,Method>> cache = Maps.newHashMap();
            private Collection<Method> methods;
            public BoxedHandler(Object target,Class<? extends Event> eventClz){
                if(!cache.containsKey(eventClz)) {
                    cache.put(eventClz,MultimapBuilder.hashKeys().hashSetValues().build());
                    List<Method> methods = Arrays.asList(eventClz.getMethods());
                    methods.stream().filter(method -> method.getParameterCount()==1&&method.getParameterTypes()[0].isAssignableFrom(Event.class)).forEach(method -> {
                       method
                    });
                }else methods=
            }
            @Subscribe

        }
        protected static final class Identifier{
            final Class<?> targetClz;
            final Class<? extends Event> eventClz;
            public Identifier(Class<?> targetClz, Class<? extends Event> eventClz){
                this.targetClz = targetClz;
                this.eventClz = eventClz;
            }

            @Override
            public boolean equals(Object o) {
                return o instanceof Identifier&&((Identifier) o).eventClz.equals(eventClz)&&((Identifier) o).targetClz.equals(targetClz);
            }

            @Override
            public int hashCode() {
                return targetClz.hashCode()-eventClz.hashCode();
            }
        }
        public static<T extends Event> void registerHandlerInMain(Object target){
            main_event_bus.register(target);
        }
        public static<T extends Event> void registerHandlerInNet(Object target){
            net_event_bus.register(target);
        }
    }
}
