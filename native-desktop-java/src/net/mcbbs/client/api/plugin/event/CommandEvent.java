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

package net.mcbbs.client.api.plugin.event;

import net.mcbbs.client.api.plugin.command.ICommandManager;
import net.mcbbs.client.api.plugin.command.IPluginCommand;
import net.mcbbs.client.main.client.plugin.loading.PluginLoaderVirtualRef;

import javax.annotation.Nonnull;

public class CommandEvent implements Event {
    private final ICommandManager manager;

    public CommandEvent(@Nonnull PluginLoaderVirtualRef ref, ICommandManager manager){
        this.manager = manager;
    }
    @Override
    public PluginLoaderVirtualRef source() {
        return null;
    }

    @Override
    public ICommandManager data() {
        return manager;
    }

    public<T,R> void provide(String pluginId, String name, IPluginCommand<T,R> command){
        manager.provide(pluginId,name,command);
    }
}
