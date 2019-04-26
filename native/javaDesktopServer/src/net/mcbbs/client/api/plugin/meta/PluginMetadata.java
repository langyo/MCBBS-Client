package net.mcbbs.client.api.plugin.meta;

import net.mcbbs.client.main.client.pluginloading.PluginLoader;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class PluginMetadata {
    public final String id,version,name,description,url,updateUrl,serverUrl,author;

    public PluginMetadata(PluginLoader invoker,String id, String version, String name, String description, String url, String updateUrl, String serverUrl, String author, String... collaborators) {
        if(invoker==null)throw new UnsupportedOperationException("Cannot instantiate PluginMetadata outside the package!");
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

    public final List<String> collaborators;
}
