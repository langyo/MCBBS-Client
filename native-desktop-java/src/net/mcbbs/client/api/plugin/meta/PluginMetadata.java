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

package net.mcbbs.client.api.plugin.meta;

import net.mcbbs.client.main.client.plugin.loading.PluginLoader;

import java.util.*;

/**
 * @author yinyangshi InitAuther97
 */
public class PluginMetadata {
    public final String id, version, name, description, url, updateUrl, serverUrl, author;
    public final List<String> collaborators;

    public PluginMetadata(PluginLoader invoker, String id, String version, String name, String description, String url, String updateUrl, String serverUrl, String author, String... collaborators) {
        if (invoker == null) {
            throw new UnsupportedOperationException("Cannot instantiate PluginMetadata outside the package!");
        }
        this.id = id;
        this.version = version;
        this.name = name;
        this.description = description;
        this.url = url;
        this.updateUrl = updateUrl;
        this.serverUrl = serverUrl;
        this.author = author;
        this.collaborators = Collections.unmodifiableList(Arrays.asList(collaborators));
    }

    public static PluginMetadata deserializeFrom(PluginLoader invoker, Map<String, Object> bindings) {
        return new PluginMetadata(invoker,
                (String) bindings.get("id"),
                (String) bindings.get("version"),
                (String) bindings.get("name"),
                (String) bindings.get("description"),
                (String) bindings.get("url"),
                (String) bindings.get("updateUrl"),
                (String) bindings.get("serverUrl"),
                (String) bindings.get("author"),
                (String[]) bindings.get("collaborators")
        );
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PluginMetadata that = (PluginMetadata) o;
        return id.equals(that.id) &&
                version.equals(that.version) &&
                name.equals(that.name) &&
                Objects.equals(description, that.description) &&
                Objects.equals(url, that.url) &&
                Objects.equals(updateUrl, that.updateUrl) &&
                Objects.equals(serverUrl, that.serverUrl) &&
                Objects.equals(author, that.author) &&
                Objects.equals(collaborators, that.collaborators);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, version, name, description, url, updateUrl, serverUrl, author, collaborators);
    }
}
