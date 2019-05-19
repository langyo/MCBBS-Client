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

package net.mcbbs.client.main.client.plugin.mapper;

import com.google.common.collect.Lists;
import com.google.common.collect.Multimap;
import com.google.common.collect.MultimapBuilder;
import com.google.inject.Singleton;
import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.mapper.Mapper;
import net.mcbbs.client.api.plugin.mapper.MapperManager;
import net.mcbbs.client.main.client.plugin.loading.PluginLoaderVirtualRef;
import net.mcbbs.client.util.InvocationHandlerFactory;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.List;
import java.util.Objects;

@Singleton
public class CobbleMapperManager implements MapperManager {
    private String id;
    private CobbleMapperManager parent;
    private List<MapperManager> childManagers = Lists.newArrayList();
    private Multimap<Class<?>, Mapper<?>> mappers = MultimapBuilder.hashKeys().hashSetValues(1).build();

    public CobbleMapperManager(@Nonnull String id) {
        this.id = id;
    }

    public CobbleMapperManager(PluginLoaderVirtualRef verifier, CobbleMapperManager parent, String id) throws IllegalArgumentException {
        if (Objects.isNull(verifier)) throw new IllegalArgumentException("verifier == null !!!");

    }

    @Nonnull
    @Override
    public String id() {
        return id;
    }

    @Nullable
    @Override
    public <I extends IPlugin, T> Mapper<T> createMapper(Class<I> plugin, String name, InvocationHandlerFactory factory) {
        Mapper<T> mapper;
        if (parent != null) {
            if ((mapper = parent.createMapper(plugin, name, factory)) == null || !mappers.put(plugin, mapper))
                return null;
        } else {
            mappers.put(plugin, (mapper = CobbleMapper.createInstance(factory, name)));
        }
        return mapper;
    }

    @Override
    public <I extends IPlugin, T> Mapper<T> getMapper(Class<I> plugin, String name) {
        //noinspection unchecked
        Mapper<T> result = (Mapper<T>) mappers.get(plugin).stream().filter(mapper -> mapper.name().contentEquals(name)).findAny().orElse(null);
        if (parent != null && result == null) result = parent.getMapper(plugin, name);
        return result;
    }

    @Nonnull
    @Override
    public MapperManager createChildManager(String id) {
        MapperManager childManager = new CobbleMapperManager(id);
        childManagers.add(childManager);
        return childManager;
    }

    @Nullable
    @Override
    public MapperManager getChildManager(String id) {
        return childManagers.stream().filter(manager -> manager.id().contentEquals(id())).findFirst().orElse(null);
    }

    @Nullable
    @Override
    public MapperManager getParent() {
        return null;
    }

    @Override
    public int hashCode() {
        return id.hashCode() + ((parent == null) ? 0 : parent.hashCode()) * (childManagers.size() / mappers.size());
    }

    @Override
    public boolean equals(Object o) {
        if (Objects.nonNull(o)) {
            if (o instanceof CobbleMapperManager) {
                return o.hashCode() == hashCode() && id.contentEquals(((CobbleMapperManager) o).id);
            }
        }
        return false;
    }
}
