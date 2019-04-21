package net.mcbbs.client.util.network;

import net.mcbbs.client.util.network.processor.ImmutableProcessorPipeline;
import net.mcbbs.client.util.thread.ThrowableRunnable;

public interface IServer extends ThrowableRunnable {
    void addPipe(String pipe, ImmutableProcessorPipeline<?> pipeline);

    void enablePipe(String pipe);

    ImmutableProcessorPipeline<?> getPipe(String pipe);

    ImmutableProcessorPipeline<?> getActivated();

    abstract class Connection {
        final Thread processor;

        public Connection(Thread processor) {
            this.processor = processor;
        }

        public abstract void shutdown();
    }
}
