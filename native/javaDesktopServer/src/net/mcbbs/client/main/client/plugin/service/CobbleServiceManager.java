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
    private final List<Area> areaCreated = Lists.newArrayList();
    private final Function<IPlugin, Area> default_area_supplier = (plugin) -> {
        Area area = new Area(plugin, Maps.newHashMap());
        areaCreated.add(area);
        return area;
    };

    private Area getOrCreateArea(IPlugin plugin) {
        return areaCreated
                .stream()
                .filter(a -> a.plugin.equals(plugin))
                .findFirst()
                .orElse(default_area_supplier.apply(plugin));
    }

    @Override
    public <T> void provides(IPlugin plugin, Class<T> serviceClass, T serviceImpl) {
        areaCreated.stream().filter(area -> area.services.get(serviceClass) instanceof DirectServiceWrapper).forEach(area -> area.replace(plugin, serviceClass, serviceImpl));
        getOrCreateArea(plugin).register(serviceClass, serviceImpl);
    }

    @Override
    public <T> T require(Class<T> serviceClass) {
        //noinspection unchecked
        return (T) areaCreated.stream()
                .filter(area -> area.services.containsKey(serviceClass))
                .findAny()
                .orElseThrow(() -> new UnsupportedOperationException("Required an unknown service!"))
                .services
                .get(serviceClass)
                .getService();
    }

    public interface ServiceWrapper<T> {
        T getService();
    }

    class Area {
        IPlugin plugin;
        Map<Class<?>, ServiceWrapper<?>> services;

        public Area(IPlugin plugin, Map<Class<?>, ServiceWrapper<?>> services) {
            this.plugin = plugin;
            this.services = services;
        }

        public <T> void register(Class<T> clz, T service) {
            services.put(clz, new DirectServiceWrapper<>(service));
        }

        public <T> void replace(IPlugin plugin, Class<T> clz, T service) {
            services.replace(clz, new RedirectServiceWrapper<>(plugin, clz));
        }
    }

    private class DirectServiceWrapper<T> implements ServiceWrapper<T> {
        T wrapped;

        public DirectServiceWrapper(@Nonnull T service) {
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

        public RedirectServiceWrapper(IPlugin plugin, Class<T> service) {
            this.plugin = plugin;
            this.service = service;
        }

        @Override
        public T getService() {
            //noinspection unchecked
            return (T) getOrCreateArea(plugin).services.get(service).getService();
        }
    }
}
