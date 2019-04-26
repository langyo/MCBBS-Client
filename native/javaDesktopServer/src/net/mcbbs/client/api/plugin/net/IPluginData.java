package net.mcbbs.client.api.plugin.net;

import net.mcbbs.client.api.plugin.meta.PluginMetadata;

public interface IPluginData<T> extends Cloneable{
    T rawData();
    String serialize();
    void deserializeFrom(String data);
    void setData(T data);
    void appendMetadata(PluginMetadata modifier, IPluginData<?> data);
    void name(PluginMetadata creator);
}
