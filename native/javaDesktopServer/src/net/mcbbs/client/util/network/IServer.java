package net.mcbbs.client.util.network;

import net.mcbbs.client.util.network.processor.IProcessorChainable;
import net.mcbbs.client.util.network.processor.ProcessorPipeline;

public interface IServer {
    void addPipe(String id,ProcessorPipeline p);
    void enablePipe(String id);
    <I>ProcessorPipeline<I> getPipe(String id);
    default<T,T1> void registerProcessor(String id, IProcessorChainable<T,T1> processor){
        getPipe(id).register(processor);
    }
}
