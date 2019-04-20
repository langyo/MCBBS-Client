package net.mcbbs.client.util.network;

import net.mcbbs.client.util.network.processor.ImmutableProcessorPipeline;
import net.mcbbs.client.util.thread.ThrowableRunnable;

public interface IServer extends ThrowableRunnable {
    void addPipe(String id, ImmutableProcessorPipeline<?> p);
    void enablePipe(String id);
    ImmutableProcessorPipeline<?> getPipe(String id);
}
