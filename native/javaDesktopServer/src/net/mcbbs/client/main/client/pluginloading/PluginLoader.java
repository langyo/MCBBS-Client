package net.mcbbs.client.main.client.pluginloading;

import net.mcbbs.client.api.plugin.BoxedPlugin;

import java.util.jar.JarFile;

public abstract class PluginLoader {
    public abstract JarFile getPluginJar(String pluginId);
    public abstract BoxedPlugin getPlugin(String pluginId);
    protected abstract void loadPlugin(String baseLoc);
}
