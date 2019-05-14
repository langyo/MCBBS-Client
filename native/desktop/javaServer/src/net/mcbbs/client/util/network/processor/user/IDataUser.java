package net.mcbbs.client.util.network.processor.user;

import net.mcbbs.client.util.network.processor.IProcessorChainable;

public interface IDataUser<A> extends IProcessorChainable<A, A> {
    void onReceived(A data);
}
