package net.mcbbs.client.util.throwable;

import javax.annotation.Nonnull;

/**
 * @deprecated Errors should be handled by System.If you want to process about error,then use this!
 */
public interface IErrorProcessor extends IThrowableProcessor {
    void process(@Nonnull Error e);

    @Override
    default void process(@Nonnull Throwable t) {
        if (t instanceof Error) {
            process((Error) t);
        }
    }
}
