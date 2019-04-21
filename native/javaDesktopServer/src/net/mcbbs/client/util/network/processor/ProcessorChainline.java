package net.mcbbs.client.util.network.processor;

public final class ProcessorChainline<I, O, O2> {
    protected final IProcessorChainable<I, O> first;
    protected final IProcessorChainable<O, O2> last;

    public ProcessorChainline(IProcessorChainable<I, O> first, IProcessorChainable<O, O2> last) {
        this.first = first;
        this.last = last;
    }

    public void fire(I data) {
        first.proc(data);
        last.proc(first.value());
    }

    public IProcessorChainable<I, O> getFirst() {
        return first;
    }

    public IProcessorChainable<O, O2> getLast() {
        return last;
    }
}
