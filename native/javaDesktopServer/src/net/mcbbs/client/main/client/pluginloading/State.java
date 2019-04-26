package net.mcbbs.client.main.client.pluginloading;

public enum State {
    /**Pre construction*/
    LOADING_FILE,
    CONSTRUCTING_PLUGIN,

    /**Construction*/
    INJECTING_SERVICE,
    INJECTING_MAPPING,

    /**Post construction*/
    INJECTING_PLUGIN_API,
    LOADED
}
