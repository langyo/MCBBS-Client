package net.mcbbs.client.util.network.processor;

public interface IProcessorChainable<I,O> extends IProcessor<I>{
    Class<I> getInputType();
    Class<O> getOutputType();

    O value();
    default void proc(I i){

    }
    O procChain(I i);
}
