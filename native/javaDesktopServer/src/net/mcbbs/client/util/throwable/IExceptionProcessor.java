package net.mcbbs.client.util.throwable;

import com.sun.istack.internal.NotNull;

public interface IExceptionProcessor extends IThrowableProcessor {
    void process(@NotNull Exception e);

    @Override
    default void process(Throwable t) {
        if (t instanceof Exception) {
            process((Exception) t);
        }
    }
}
