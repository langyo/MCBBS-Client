package net.mcbbs.client.util.network.processor.user;

import net.mcbbs.client.util.network.processor.IProcessorChainable;

public interface IDataUser<T> extends IProcessorChainable<T,T> {
    void onReceived(T data);
    @Override
    default T procChain(T t){
        onReceived(t);
        return t;
    }
}
