package net.mcbbs.client.main.client.plugin.loading;

public enum State implements Comparable<State> {
    NON_STARTING,

    /**
     * Pre construction
     */
    LOADING_FILE,
    INJECTING_PLUGIN_API,

    /**
     * Construction
     */
    CONSTRUCTING_PLUGIN,

    /**
     * Post construction
     */
    INJECTING_MAPPING,
    LOADED
}
