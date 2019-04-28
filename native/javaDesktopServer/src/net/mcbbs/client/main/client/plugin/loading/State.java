package net.mcbbs.client.main.client.plugin.loading;

public enum State implements Comparable<State> {
    NON_STARTING,

    /**Pre construction*/
    LOADING_FILE,
    CONSTRUCTING_PLUGIN,

    /**Construction*/
    INJECTING_SERVICE,
    INJECTING_MAPPING,

    /**Post construction*/
    INJECTING_PLUGIN_API,
    LOADED;
}
