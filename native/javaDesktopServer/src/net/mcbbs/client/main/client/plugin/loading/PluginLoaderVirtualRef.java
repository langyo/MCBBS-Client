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

package net.mcbbs.client.main.client.plugin.loading;

import net.mcbbs.client.api.plugin.BoxedPlugin;

import java.util.jar.JarFile;

public class PluginLoaderVirtualRef extends PluginLoader {

    public PluginLoaderVirtualRef(PluginLoader loader) throws UnsupportedOperationException {
        if (loader == null || loader instanceof PluginLoaderVirtualRef || loader.getClass().isSynthetic())
            throw new UnsupportedOperationException("Cannot construct PluginLoaderVirtualRef with an unknown PluginLoader!");
    }

    @Override
    public JarFile getPluginJar(String pluginId) {
        return null;
    }

    @Override
    public BoxedPlugin getPlugin(String pluginId) {
        return null;
    }

    @Override
    public void loadPlugin(String baseLoc) {
        throw new UnsupportedOperationException();
    }

    @Override
    public State getState() {
        return null;
    }
}
