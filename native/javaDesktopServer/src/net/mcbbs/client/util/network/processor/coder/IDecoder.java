package net.mcbbs.client.util.network.processor.coder;

import net.mcbbs.client.util.network.processor.IProcessorChainable;

public interface IDecoder<I,O> extends IProcessorChainable<I,O> {
    I decode(O data);
}
