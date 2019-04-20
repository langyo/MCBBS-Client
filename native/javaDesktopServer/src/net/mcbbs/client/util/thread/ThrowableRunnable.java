package net.mcbbs.client.util.thread;

import net.mcbbs.client.util.throwable.IThrowableProcessor;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
public interface ThrowableRunnable extends Runnable{
    List<IThrowableProcessor> processors = new LinkedList<>();
    default void run() {
        try{
            active();
        }catch(Throwable t){
            new Thread(()-> processors.forEach((itp)->itp.process(t))).start();
        }
    }
    void active() throws Throwable;
    default void addThrowableProcessor(IThrowableProcessor iThrwblePrcssr){
        processors.add(iThrwblePrcssr);
    }
    default void addThrowableProcessors(Collection<IThrowableProcessor> iThrwblePrcssrs){
        processors.addAll(iThrwblePrcssrs);
    }
}
