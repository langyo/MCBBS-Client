package net.mcbbs.client.api.plugin;

public interface IPluginCommand<T,R> {
    R execute(T arg);
    String usage();
}
