package net.mcbbs.client.api.plugin.meta;

import net.mcbbs.client.main.client.pluginloading.PluginLoader;
import net.mcbbs.client.util.CollectionUtils;

import javax.script.Bindings;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class PluginMetadata {
    public final String id,version,name,description,url,updateUrl,serverUrl,author;
    public static PluginMetadata deserializeFrom(PluginLoader invoker,Bindings bindings){
        return new PluginMetadata(invoker,
                (String) bindings.get("id"),
                (String)bindings.get("version"),
                (String)bindings.get("name"),
                (String)bindings.get("description"),
                (String)bindings.get("url"),
                (String)bindings.get("updateUrl"),
                (String)bindings.get("serverUrl"),
                (String)bindings.get("author"),
                CollectionUtils.cast(
                        (Object[])bindings.get("collaborators")
                )
        );
    }
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
