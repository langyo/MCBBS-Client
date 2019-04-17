package net.mcbbs.client.util.throwable;

import com.sun.istack.internal.NotNull;

/**
 * @deprecated Errors should be handled by System.If you want to process about error,then use this!
 */
public interface IErrorProcessor extends IThrowableProcessor{
    void process(@NotNull Error e);

    @Override
    default void process(Throwable t) {
        if(t instanceof Error){
            process((Error)t);
        }
    }
}
