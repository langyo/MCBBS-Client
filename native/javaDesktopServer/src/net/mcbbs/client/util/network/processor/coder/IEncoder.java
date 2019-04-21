package net.mcbbs.client.util.network.processor.coder;

import net.mcbbs.client.util.network.processor.IProcessorChainable;

public interface IEncoder<I, O> extends IProcessorChainable<I, O> {
    O encode(I data);
}
