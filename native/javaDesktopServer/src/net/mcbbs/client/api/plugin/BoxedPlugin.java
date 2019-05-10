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

import net.mcbbs.client.api.plugin.meta.PluginMetadata;
import net.mcbbs.client.api.plugin.service.Service;

import javax.annotation.Nullable;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public final class BoxedPlugin<T extends IPlugin> {
    protected final List<Service<?, ?>> services;
    protected final Map<String, IPluginCommand<?, ?>> commands;
    protected final T plugin;
    protected final PluginMetadata metadata;

    public BoxedPlugin(T base, PluginMetadata meta, Service<?, ?>[] services, Map<String, IPluginCommand<?, ?>> commands) {
        plugin = base;
        metadata = meta;
        this.commands = Collections.unmodifiableMap(commands);
        this.services = Arrays.asList(services);
    }

    @Nullable
    public Service<?, ?> getService(String id) {
        return services.stream().filter(service -> service.name().contentEquals(id)).findAny().orElse(null);
    }

    @Nullable
    public IPluginCommand<?, ?> getCommand(String id) {
        return commands.get(id);
    }
}
