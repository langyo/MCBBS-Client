package net.mcbbs.client.util.network.processor;

import com.google.common.collect.Lists;

import java.util.List;
import java.util.ListIterator;

public final class ProcessorPipeline<I> {
    List<ProcessorChainline> order = Lists.newArrayList();

    public <O, O2> void addChainline(ProcessorChainline chain) {
        if (order.isEmpty()) {
            order.add(chain);
        } else {
            ListIterator<ProcessorChainline> iterator = order.listIterator();
            ProcessorChainline last;
            while (iterator.hasNext()) iterator.next();
            last = iterator.previous();
            if (last.last != null && checkSubClass(last.last.getOutputType(), chain.first.getInputType()) != null) {
                order.add(chain);
            }
        }
    }

    private Class<?> checkSubClass(Class<?> f, Class<?> l) {
        try {
            return f.asSubclass(l);
        } catch (ClassCastException e) {
            return null;
        }
    }

    public <O, O2> void removeChainline(ProcessorChainline<I, O, O2> chain) {
        order.remove(chain);
    }

    public void fire(I data) {
        ListIterator<ProcessorChainline> iter = order.listIterator();
        if (iter.hasNext()) {
            Object data2;
            ProcessorChainline chainline = iter.next();
            //noinspection unchecked
            chainline.fire(data);
            data2 = chainline.last.value();
            while (iter.hasNext()) {
                chainline = iter.next();
                //noinspection unchecked
                chainline.fire(data2);
            }
        }
    }
}
