package net.mcbbs.client.util.network.processor;

public interface IProcessor<T> {
    Class<T> getType();
    void proc(T t);
}
