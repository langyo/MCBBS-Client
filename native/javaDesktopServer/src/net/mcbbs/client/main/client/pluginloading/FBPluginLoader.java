package net.mcbbs.client.main.client.pluginloading;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import jdk.nashorn.api.scripting.NashornScriptEngine;
import net.mcbbs.client.api.plugin.BoxedPlugin;
import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.meta.PluginMetadata;

import javax.script.Bindings;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.script.SimpleScriptContext;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.jar.JarFile;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FBPluginLoader extends PluginLoader {
    protected final List<JarFile> plugins = Lists.newArrayList();
    protected NashornScriptEngine js_engine;
    @Override
    public JarFile getPluginJar(String pluginId) {
        return null;
    }

    @Override
    public BoxedPlugin getPlugin(String pluginId) {
        return null;
    }

    @Override
    protected void loadPlugin(String baseLocation) {
        try {
            Stream<JarFile> files = Files.walk(Paths.get(baseLocation)).map(Path::toFile).map(file -> {
                try {
                    return new JarFile(file);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return null;
            }).filter(Objects::nonNull);
            plugins.addAll(files.collect(Collectors.toList()));
            Map<PluginMetadata, IPlugin> plugins = Maps.newHashMap();
            files.forEach(file-> {
                try {
                    initializeNashorn();
                    loadPlugin(plugins,file);
                } catch (IOException | ScriptException | NoSuchMethodException e) {
                    e.printStackTrace();
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void initializeNashorn() throws ScriptException {
        js_engine = (NashornScriptEngine)new ScriptEngineManager().getEngineByName("nashorn");
        js_engine.eval(new InputStreamReader(getClass().getResourceAsStream("assets/mcbbsclient/main/config.js")));
    }

    private void loadPlugin(Map<PluginMetadata, IPlugin> plugins, JarFile file) throws IOException, ScriptException {
        PluginMetadata meta;
        Bindings bindings = js_engine.createBindings();
        js_engine.eval(new InputStreamReader(file.getInputStream(file.getJarEntry("plugin.js"))),bindings);
        bindings.get()
        js_engine.setContext(new SimpleScriptContext());

    }
}
