/*
   Copyright 2019 langyo<langyo.china@gmail.com> and contributors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */

package net.mcbbs.client.main.client.plugin.mapper;

import com.google.common.collect.Maps;
import net.mcbbs.client.api.plugin.IPlugin;
import net.mcbbs.client.api.plugin.mapper.Mapper;
import net.mcbbs.client.util.InvocationHandlerFactory;

import javax.annotation.Nonnull;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

//import java.util.Arrays;
//import java.util.List;

public class CobbleMapper<I extends IPlugin, T> implements Mapper<T> {

    //private static final List<String> METHOD_WITHOUT_CHECKING_INSTANCE = Arrays.asList("setInvocationHandlerFactory");

    protected final Map<Method, Method> method_mapping = Maps.newHashMap();
    protected final Map<Method, Function<Object[], Object[]>> arg_mapping = Maps.newHashMap();
    protected final Map<Method, Object> instance_mapping = Maps.newHashMap();
    private InvocationHandler invocationHandler;
    private String name;

    private CobbleMapper(@Nonnull String name) {
        this.name = Objects.requireNonNull(name);
    }

    public static final <I extends IPlugin, T> CobbleMapper<I, T> createInstance(InvocationHandlerFactory factory, String name) {
        //noinspection unchecked
        CobbleMapper<I, T> cobbleMapper = new CobbleMapper<>(name);
        /*(CobbleMapper<T>)Proxy.newProxyInstance(CobbleMapper.class.getClassLoader(), CobbleMapper.class.getInterfaces(),
                factory.create(new InvocationHandlerFactory.AroundAdviceAdapter(){
                    boolean instanceSet = false;
                    @Override
                    public String before(Object instance, Method method, Object[] args) {
                        if (METHOD_WITHOUT_CHECKING_INSTANCE.contains(method.getName())){
                            if(args[0]!=null)instanceSet=true;
                            else instanceSet=false;
                        }
                        if (!(METHOD_WITHOUT_CHECKING_INSTANCE.contains(method.getName())||instanceSet)) {
                            return "Cannot invoke other methods without set the instance!";
                        }
                        return "";
                    }
                })
        );*/
        cobbleMapper.setInvocationHandlerFactory(factory);
        return cobbleMapper;
    }

    private void setInvocationHandlerFactory(InvocationHandlerFactory f) {
        invocationHandler = f.create(new InvocationHandlerFactory.AroundAdviceAdapter() {
            @Override
            public Object exec(Object proxy, Method method, Object[] args) throws InvocationTargetException, IllegalAccessException {
                if (method_mapping.containsKey(method)) {
                    Function<Object[], Object[]> args_mapper = arg_mapping.get(method);
                    Method mapped = method_mapping.get(method);
                    return mapped.invoke(instance_mapping.get(mapped), args_mapper.apply(args));
                }
                return method.invoke(proxy, args);
            }
        });
    }


    @Override
    public Mapper<T> mapMethod(@Nonnull Method raw, @Nonnull Method mapped, @Nonnull Function<Object[], Object[]> argumentMapper, Object instance) {
        method_mapping.put(raw, mapped);
        arg_mapping.put(raw, argumentMapper);
        instance_mapping.put(mapped, instance);
        return this;
    }

    @Override
    public Mapper<T> unmapMethod(Method raw) {
        instance_mapping.remove(method_mapping.remove(raw));
        arg_mapping.remove(raw);
        return this;
    }


    @Override
    public T mapped(Class<T> clz) {
        //noinspection unchecked
        return (T) Proxy.newProxyInstance(clz.getClassLoader(), clz.getInterfaces(), invocationHandler);
    }

    @Override
    @Nonnull
    public String name() {
        return name;
    }
}
