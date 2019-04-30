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
    protected void loadPlugin(String baseLoc) {

    }

    @Override
    public State getState() {
        return null;
    }
}
