package net.mcbbs.client.util.network.processor.coder;

import net.mcbbs.client.util.network.processor.IProcessorChainable;

public interface IDEcoder extends IProcessorChainable {
    void code(String data);
}
