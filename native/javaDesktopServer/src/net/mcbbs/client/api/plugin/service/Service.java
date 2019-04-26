package net.mcbbs.client.api.plugin.service;

public interface Service<I,O> {
    O invoke(I arg) throws Exception;
}
