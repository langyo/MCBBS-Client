package net.mcbbs.client.util.thread;

public interface SingleArgumentRunnable<A> extends Runnable {
    A argument();

    void setArgument(A arg);

    default void run() {
        runWithArg(argument());
    }

    void runWithArg(A arg);
}
