package net.mcbbs.client.util;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public interface InvocationHandlerFactory {
    InvocationHandler create(AroundAdvice advice);
    InvocationHandler extra(InvocationHandler another,AroundAdvice advice);
    static InvocationHandlerFactory createDefault(){
        return new InvocationHandlerFactory() {
            @Override
            public InvocationHandler create(AroundAdvice advice) {
                return (proxy, method, objects) -> {
                    Object result = null;
                    advice.before(proxy,method,objects);
                    try{
                        result = advice.exec(proxy,method,objects);
                        advice.after(proxy,method,objects);
                    }catch (Throwable t){
                        advice.uncaughtThrowable(proxy,method,objects,t);
                    }
                    return result;
                };
            }

            @Override
            public InvocationHandler extra(InvocationHandler another,AroundAdvice advice) {
                return (proxy, method, objects) -> {
                    Object result = null;
                    advice.before(proxy,method,objects);
                    try{
                        result = another.invoke(proxy,method,objects);
                        advice.after(proxy,method,objects);
                    }catch (Throwable t){
                        advice.uncaughtThrowable(proxy,method,objects,t);
                    }
                    return result;
                };
            }
        };
    }
    interface AroundAdvice{
        String before(Object instance,Method method,Object[] args);
        Object exec(Object proxy,Method method,Object[] args) throws InvocationTargetException, IllegalAccessException;
        void after(Object instance,Method method,Object[] args);
        void uncaughtThrowable(Object instance,Method method,Object[] args,Throwable t) throws Throwable;
    }
    class AroundAdviceAdapter implements AroundAdvice{
        @Override
        public String before(Object instance, Method method, Object[] args) {
            return "";
        }

        @Override
        public Object exec(Object proxy, Method method, Object[] args) throws InvocationTargetException, IllegalAccessException {
            return method.invoke(proxy,args);
        }

        @Override
        public void after(Object instance, Method method, Object[] args) {}

        @Override
        public void uncaughtThrowable(Object instance, Method method, Object[] args, Throwable t) throws Throwable {}
    }
}
