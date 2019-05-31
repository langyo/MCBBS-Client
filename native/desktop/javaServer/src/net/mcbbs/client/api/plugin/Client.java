/*
   Copyright 2019 langyo<langyo.china@gmail.com> and contributors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */

package net.mcbbs.client.api.plugin;

import com.google.common.collect.Maps;
import com.google.common.collect.Multimap;
import com.google.common.collect.MultimapBuilder;
import com.google.common.eventbus.EventBus;
import com.google.common.eventbus.Subscribe;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import net.mcbbs.client.api.plugin.command.ICommandManager;
import net.mcbbs.client.api.plugin.event.Event;
import net.mcbbs.client.api.plugin.mapper.MapperManager;
import net.mcbbs.client.api.plugin.service.ServiceManager;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public abstract class Client {

    @Inject
    @Named("service_manager")
    private static ServiceManager smImpl;

    @Inject
    @Named("plugin_list")
    private static List<BoxedPlugin<? extends IPlugin>> plugins;

    @Inject
    @Named("mapper_factory")
    private static MapperManager mapper_factory;

    @Inject
    @Named("main_event_bus")
    private static EventBus main_event_bus;

    @Inject
    @Named("net_event_bus")
    private static EventBus net_event_bus;

    @Inject
    @Named("internal_event_bus")
    private static EventBus internal_event_bus;

    @Inject
    @Named("command_manager")
    private static ICommandManager command_manager;
    private Client() {
    }

    public static ServiceManager getServiceManager() {
        return smImpl;
    }

    public static BoxedPlugin<?> getPlugin(String pluginId) {
        return plugins.stream().filter(plugin -> plugin.metadata.id.contentEquals(pluginId)).findAny().orElse(null);
    }

    public static MapperManager getMapperFactory() {
        return mapper_factory;
    }

    public static ICommandManager getCommandManager() {
        return command_manager;
    }

    public static final class EventBusController {
        protected static final Multimap<Type, BoxedHandler<? extends Event>> handler = MultimapBuilder.hashKeys().hashSetValues().build();

        public static <T extends Event> T post(T event, EventBusController.Type type) {
            switch (type) {
                case NET:
                    net_event_bus.post(event);
                    break;
                case MAIN:
                    main_event_bus.post(event);
                    break;
                case INTERNAL:
                    internal_event_bus.post(event);
                    break;
            }
            return event;
        }

        public static <T extends Event> void register(Object target, Class<T> eventClz, EventBusController.Type type) {
            BoxedHandler<T> var = new BoxedHandler<>(target, eventClz);
            handler.put(type, var);
            switch (type) {
                case NET:
                    net_event_bus.register(var);
                    break;
                case MAIN:
                    main_event_bus.register(var);
                    break;
                case INTERNAL:
                    internal_event_bus.register(var);
                    break;
            }
        }

        public static <T extends Event> void unregister(Object target, Class<T> eventClz, EventBusController.Type type) {
            //noinspection unchecked
            BoxedHandler<T> var = (BoxedHandler<T>) handler.get(type).stream()
                    .filter(handler -> handler.instance.equals(target) && handler.eventClass.equals(eventClz))
                    .findFirst()
                    .orElseThrow(() -> new UnsupportedOperationException("Cannot delete an undefined handler!"));
            switch (type) {
                case NET:
                    net_event_bus.unregister(var);
                    break;
                case MAIN:
                    main_event_bus.unregister(var);
                    break;
                case INTERNAL:
                    internal_event_bus.unregister(var);
                    break;
            }
        }

        public enum Type {
            INTERNAL, NET, MAIN
        }

        protected static final class BoxedHandler<T extends Event> {
            protected static final Map<Class<? extends Event>, Multimap<Class<?>, Method>> cache = Maps.newHashMap();
            private final Collection<Method> methods;
            private final Object instance;
            private final Class<? extends Event> eventClass;

            public BoxedHandler(Object target, Class<? extends Event> eventClz) {
                Multimap<Class<?>, Method> var0;
                if (!cache.containsKey(eventClz)) {
                    cache.put(eventClz, MultimapBuilder.hashKeys().hashSetValues().build());
                    methods = Arrays.stream(eventClz.getMethods()).filter(method ->
                            method.isAnnotationPresent(Plugin.SubscribeEvent.class) &&
                                    method.getParameterCount() == 1 &&
                                    method.getParameterTypes()[0].isAssignableFrom(eventClz) &&
                                    Modifier.isPublic(method.getModifiers()) &&
                                    !Modifier.isStatic(method.getModifiers())
                    ).collect(Collectors.toList());
                    cache.get(eventClz).putAll(target.getClass(), methods);
                } else if (!cache.get(eventClz).containsKey(target.getClass())) {
                    methods = Arrays.stream(eventClz.getMethods()).filter(method ->
                            method.isAnnotationPresent(Plugin.SubscribeEvent.class) &&
                                    method.getParameterCount() == 1 &&
                                    method.getParameterTypes()[0].isAssignableFrom(eventClz) &&
                                    Modifier.isPublic(method.getModifiers()) &&
                                    !Modifier.isStatic(method.getModifiers())
                    ).collect(Collectors.toList());
                    cache.get(eventClz).putAll(target.getClass(), methods);
                } else methods = cache.get(eventClz).get(target.getClass());
                instance = target;
                eventClass = eventClz;
            }

            @Subscribe
            public void handle(T event) throws InvocationTargetException, IllegalAccessException {
                for (Method m : methods) m.invoke(instance, event);
            }
        }

        protected static final class Identifier {
            final Class<?> targetClz;
            final Class<? extends Event> eventClz;

            public Identifier(Class<?> targetClz, Class<? extends Event> eventClz) {
                this.targetClz = targetClz;
                this.eventClz = eventClz;
            }

            @Override
            public boolean equals(Object o) {
                return o instanceof Identifier && ((Identifier) o).eventClz.equals(eventClz) && ((Identifier) o).targetClz.equals(targetClz);
            }

            @Override
            public int hashCode() {
                return targetClz.hashCode() - eventClz.hashCode();
            }
        }
    }
}
