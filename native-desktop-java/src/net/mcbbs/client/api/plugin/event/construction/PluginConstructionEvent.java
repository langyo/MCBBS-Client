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
import net.mcbbs.client.api.plugin.service.ServiceManager;
import net.mcbbs.client.main.client.plugin.loading.PluginLoader;
import net.mcbbs.client.main.client.plugin.loading.PluginLoaderVirtualRef;

import javax.annotation.Nonnull;

public abstract class PluginConstructionEvent implements Event {
    private final PluginLoader source;

    public PluginConstructionEvent(@Nonnull PluginLoaderVirtualRef source) {
        this.source = source;
    }

    @Override
    public PluginLoader source() {
        return source;
    }

    public static class ServiceMapping extends PluginConstructionEvent {
        private final ServiceManager manager;

        public ServiceMapping(PluginLoaderVirtualRef source, @Nonnull ServiceManager serviceManager) {
            super(source);
            manager = serviceManager;
        }

        @Override
        public ServiceManager data() {
            return manager;
        }

        public <T> void provides(IPlugin plugin, Class<T> serviceClass, T serviceImpl) {
            manager.provides(plugin, serviceClass, serviceImpl);
        }
    }

    public static class CommandRegistring extends PluginConstructionEvent {

        public CommandRegistring(@Nonnull PluginLoaderVirtualRef source) {
            super(source);
        }

        @Override
        public Object data() {
            return null;
        }
    }
}
