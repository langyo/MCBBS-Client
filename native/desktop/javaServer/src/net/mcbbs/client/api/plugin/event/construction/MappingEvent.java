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

package net.mcbbs.client.api.plugin.event.construction;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.event.Event;
import net.mcbbs.client.api.plugin.mapper.Mapper;
import net.mcbbs.client.api.plugin.mapper.MapperManager;
import net.mcbbs.client.main.client.plugin.loading.PluginLoader;
import net.mcbbs.client.main.client.plugin.loading.PluginLoaderVirtualRef;
import net.mcbbs.client.util.InvocationHandlerFactory;

public abstract class MappingEvent implements Event {
    public abstract PluginLoader source();

    public abstract MapperManager data();

    public static class Methods extends MappingEvent {
        private final PluginLoader source;
        private final MapperManager data;

        public Methods(PluginLoaderVirtualRef source, MapperManager data) {
            this.source = source;
            this.data = data;
        }

        @Override
        public PluginLoader source() {
            return source;
        }

        @Override
        public MapperManager data() {
            return data;
        }

        public <I extends IPlugin, T> Mapper<T> registerMapper(Class<I> pluginClz, String name, InvocationHandlerFactory factory) {
            return data.createMapper(pluginClz, name, factory);
        }

        public <I extends IPlugin, T> Mapper<T> getMapper(Class<I> pluginClz, String name) {
            return data.getMapper(pluginClz, name);
        }
    }
}
