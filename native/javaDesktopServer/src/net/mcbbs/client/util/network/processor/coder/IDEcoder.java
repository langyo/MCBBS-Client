package net.mcbbs.client.util.network.processor.coder;

import net.mcbbs.client.util.network.processor.IProcessorChainable;

public interface IDEcoder<E,D> extends IProcessorChainable {
    E decode(D encoded);
    D encode(E decoded);
    default Object procChain(Object o){
        throw new UnsupportedOperationException();
    }
}
