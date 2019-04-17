package net.mcbbs.client.util.thread;

public interface ArgumentableThrowableRunnable extends ThrowableRunnable,ArgumentableRunnable{
    default void run() {
        try {
            active();
        }catch (Throwable e){
            e.printStackTrace(System.err);
        }
    }
    default void active() throws Throwable{
        active2(args.toArray());
    }
    void active2(Object[] args) throws Throwable;
}
