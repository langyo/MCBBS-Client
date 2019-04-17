package net.mcbbs.client.util.network.processor;

import net.mcbbs.client.util.network.processor.user.IDataUser;
import net.mcbbs.client.util.thread.SingleArgumentRunnable;

public final class ChainProcessorFactory {
    public static<T> IDataUser<T> newSimpleDataUser(Class<T> dataType,SingleArgumentRunnable<T> runnable){
        return new IDataUser<>() {
            @Override
            public void onReceived(T data) {
                runnable.runWithArg(data);
            }

            @Override
            public Class<T> getInputType() {
                return dataType;
            }

            @Override
            public Class<T> getOutputType() {
                return null;
            }

            @Override
            public void setValue(T value) {
                throw new UnsupportedOperationException();
            }
            @Override
            public T value() {
                return null;
            }
        };
    }

}
