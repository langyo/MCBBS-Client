package net.mcbbs.client.util.network.processor;

import javax.annotation.Nonnull;

public interface IProcessorChainable<I,O> extends IProcessor<I>{
    Class<I> getInputType();
    Class<O> getOutputType();
    void setValue(O value);
    O value();
    default void proc(I i){
        setValue(procChain(i));
    }
    O procChain(I i);
}
