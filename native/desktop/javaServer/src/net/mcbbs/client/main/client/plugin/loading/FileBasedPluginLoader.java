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

import com.google.common.collect.Maps;
import com.google.common.eventbus.AsyncEventBus;
import com.google.common.eventbus.EventBus;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;
import com.google.inject.name.Names;
import net.mcbbs.client.api.plugin.BoxedPlugin;
import net.mcbbs.client.api.plugin.Client;
import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.event.construction.MappingEvent;
import net.mcbbs.client.api.plugin.event.construction.PluginConstructionEvent;
import net.mcbbs.client.api.plugin.mapper.MapperManager;
import net.mcbbs.client.api.plugin.meta.PluginMetadata;
import net.mcbbs.client.api.plugin.service.ServiceManager;
import net.mcbbs.client.main.client.plugin.mapper.CobbleMapperManager;
import net.mcbbs.client.main.client.plugin.service.CobbleServiceManager;
import org.yaml.snakeyaml.Yaml;

import javax.script.Bindings;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.Executors;
import java.util.jar.JarFile;
import java.util.stream.Stream;

/**
 * Only able to be ran in the same thread as Launcher and Client!
 * Or there will be a ClassCastException while injecting plugins!
 */
public class FileBasedPluginLoader extends PluginLoader {
    private final Map<String, JarFile> pluginJar = Maps.newHashMap();
    private final Map<String, BoxedPlugin<? extends IPlugin>> pluginBoxed = Maps.newHashMap();
    private final ClassLoader thread_classloader = Thread.currentThread().getContextClassLoader();
    private final PluginLoaderVirtualRef ref = new PluginLoaderVirtualRef(this);
    private Injector injector;
    private ScriptEngine js_engine;
    private State state = State.NON_STARTING;

    @Override
    public JarFile getPluginJar(String pluginId) {
        if (state.compareTo(State.CONSTRUCTION_PLUGIN) < 0)
            throw new IllegalStateException("Trying to get a plugin jar before loading the plugin jars!");
        return pluginJar.get(pluginId);
    }

    @Override
    public BoxedPlugin<? extends IPlugin> getPlugin(String pluginId) {
        if (state.compareTo(State.LOADED) < 0)
            throw new IllegalStateException("Trying to get a plugin class before completely loading plugins!");
        return pluginBoxed.get(pluginId);
    }

    @SuppressWarnings("UnstableApiUsage")
    @Override
    public void loadPlugin(String baseLocation) {
        Stream<IPlugin> pluginStream;
        try {
            Stream<File> files = Files.walk(Paths.get(baseLocation)).map(Path::toFile);
            Map<PluginMetadata, IPlugin> plugin = Maps.newHashMap();
            initializeNashorn();

            state = State.LOADING_FILE;
            pluginStream = files.filter(File::isFile)
                    .filter(file -> file.toPath().getFileName().endsWith(".jar"))
                    .map(file -> {
                        try {
                            return loadPlugin(plugin, file);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        return null;
                    }).filter(Objects::nonNull);
            plugin.forEach((meta,plug)->pluginBoxed.put(meta.id,new BoxedPlugin<>(plug,meta)));
        } catch (IOException | ScriptException e) {
            e.printStackTrace();
            return;
        }

        state = State.CONSTRUCTION_PLUGIN;
        pluginStream.forEach(IPlugin::onEnabled);

        state = State.COLLECTING_MAPPING;
        MappingEvent.Methods event = Client.EventBusController.post(
                new MappingEvent.Methods(ref, new CobbleMapperManager("")),
                Client.EventBusController.Type.MAIN
        );

        state = State.COLLECTING_SERVICE;
        PluginConstructionEvent.ServiceMapping mapping_event = new PluginConstructionEvent.ServiceMapping(getRef(),new CobbleServiceManager());

        state = State.INJECTING_PLUGIN_API;
        injector = Guice.createInjector((Module) binder -> {
            binder.bind(ServiceManager.class).annotatedWith(Names.named("service_manager")).toInstance(mapping_event.data());
            binder.bind(List.class).annotatedWith(Names.named("plugin_list")).toInstance(new ArrayList<>(pluginBoxed.values()));

            binder.bind(EventBus.class).annotatedWith(Names.named("internal_event_bus")).toInstance(new AsyncEventBus(Executors.newFixedThreadPool(5)));
            binder.bind(EventBus.class).annotatedWith(Names.named("net_event_bus")).toInstance(new AsyncEventBus(Executors.newCachedThreadPool()));
            binder.bind(EventBus.class).annotatedWith(Names.named("main_event_bus")).toInstance(new EventBus());
            binder.bind(MapperManager.class).annotatedWith(Names.named("mapper_manager")).toInstance(event.data());
            binder.requestStaticInjection(Client.class);
        });
    }

    @Override
    public State getState() {
        return state;
    }

    @Override
    public boolean isPluginLoaded(IPlugin plugin) {
        return pluginBoxed.values().stream().map(BoxedPlugin::getPlugin).anyMatch(plug-> plug.equals(plugin));
    }

    public Injector getInjector() {
        return injector;
    }

    private void initializeNashorn() throws ScriptException {
        js_engine = new ScriptEngineManager().getEngineByName("nashorn");
        js_engine.eval(new InputStreamReader(getClass().getResourceAsStream("assets/mcbbsclient/main/config.js")));
    }

    private IPlugin loadPlugin(Map<PluginMetadata, IPlugin> plugins, File f) throws Exception {
        JarFile file = new JarFile(f);
        URLClassLoader ucl = new URLClassLoader(new URL[]{f.toURI().toURL()}, thread_classloader);
        String mainClassLocation;
        PluginMetadata meta;
        if (ucl.getResource("plugin.js") != null) {
            Bindings bindings = js_engine.createBindings();
            js_engine.eval(new InputStreamReader(file.getInputStream(file.getJarEntry("config.js"))), bindings);
            meta = PluginMetadata.deserializeFrom(this, bindings);
            mainClassLocation = (String) bindings.get("plugin");
        } else if (ucl.getResource("plugin.yml") != null) {
            InputStream is = ucl.getResourceAsStream("plugin.yml");
            Yaml yaml = new Yaml();
            //noinspection unchecked
            Map<String, Object> bindings = yaml.loadAs(is, Map.class);
            meta = PluginMetadata.deserializeFrom(this, bindings);
            mainClassLocation = (String) bindings.get("plugin");
        } else {
            System.out.println("Unable to instantiate plugin '" + file.getName() + "'.It may be a non-plugin file.");
            return null;
        }
        Class<? extends IPlugin> pluginClz = ucl.loadClass(mainClassLocation).asSubclass(IPlugin.class);
        IPlugin instance = pluginClz.getConstructor().newInstance();
        plugins.put(meta, instance);
        pluginJar.put(meta.id, file);
        return instance;
    }

    public PluginLoaderVirtualRef getRef() {
        return ref;
    }
}
