package net.mcbbs.client.util.throwable;


import javax.annotation.Nonnull;

public interface IExceptionProcessor extends IThrowableProcessor {
    void process(@Nonnull Exception e);

    @Override
    default void process(@Nonnull Throwable t) {
        if (t instanceof Exception) {
            process((Exception) t);
        }
    }
}
