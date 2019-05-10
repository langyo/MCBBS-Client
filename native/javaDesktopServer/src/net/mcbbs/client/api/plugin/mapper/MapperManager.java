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

package net.mcbbs.client.api.plugin.mapper;

import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.util.InvocationHandlerFactory;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public interface MapperManager extends Cloneable {
    @Nonnull
    String id();
    @Nullable
    <I extends IPlugin, T> Mapper<T> createMapper(Class<I> plugin, String name, InvocationHandlerFactory factory);
    @Nullable
    <I extends IPlugin, T> Mapper<T> getMapper(Class<I> plugin, String name);
    @Nonnull
    MapperManager createChildManager(String id);
    @Nullable
    MapperManager getChildManager(String id);
    @Nullable
    MapperManager getParent();
}
