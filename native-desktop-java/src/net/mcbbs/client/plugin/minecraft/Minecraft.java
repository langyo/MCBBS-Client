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

package net.mcbbs.client.plugin.minecraft;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.Plugin;
import net.mcbbs.client.api.plugin.event.CommandEvent;
import net.mcbbs.client.api.plugin.event.construction.MappingEvent;
import net.mcbbs.client.api.plugin.event.construction.PluginConstructionEvent;
import net.mcbbs.client.api.plugin.meta.PluginMetadata;

public class Minecraft implements IPlugin {
    String modid;
    @Override
    public void onEnabled(PluginMetadata key) {
        modid = key.id;
    }

    @Override
    public void onDisabled() {

    }

    @Plugin.SubscribeEvent(MappingEvent.Methods.class)
    public void onMappingMethod(MappingEvent.Methods event) throws NoSuchMethodException {
    }

    @Plugin.SubscribeEvent(PluginConstructionEvent.ServiceMapping.class)
    public void onServiceMapping(PluginConstructionEvent.ServiceMapping event) {

    }

    @Plugin.SubscribeEvent(CommandEvent.class)
    public void onRegisterCommand(CommandEvent event){
        event.provide(modid,"minecraft",null);
    }
}
