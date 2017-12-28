import {SnpResource} from './resource';

describe('Resource.class', () => {

    it('parses default parameter into namespace/module/resource', () => {
        const resource = new SnpResource();
        expect(resource.namespace).toEqual(resource.RESOURCE_CHUNK_GRANTED);
        expect(resource.module).toEqual(resource.RESOURCE_CHUNK_GRANTED);
        expect(resource.resource).toEqual(resource.RESOURCE_CHUNK_GRANTED);
    });

    it('parses provided string parameter into namespace/module/resource', () => {
        const resource = new SnpResource('rns:human-resources:employees/23');
        expect(resource.namespace).toEqual('rns');
        expect(resource.module).toEqual('human-resources');
        expect(resource.resource).toEqual('employees/23');
    });

    it('parses only first three chunks of provided resource string into namespace/module/resource', () => {
        const resource = new SnpResource('rns:human-resources:employees/23:performDelete:returnAll');
        expect(resource.namespace).toEqual('rns');
        expect(resource.module).toEqual('human-resources');
        expect(resource.resource).toEqual('employees/23');
    });

    it('parses provided "namespace:module:" string parameter into namespace/module/resource', () => {
        const resource = new SnpResource('rns:human-resources:');
        expect(resource.namespace).toEqual('rns');
        expect(resource.module).toEqual('human-resources');
        expect(resource.resource).toEqual(resource.RESOURCE_CHUNK_GRANTED);
    });

    it('parses provided "namespace::" string parameter into namespace/module/resource', () => {
        const resource = new SnpResource('rns::');
        expect(resource.namespace).toEqual('rns');
        expect(resource.module).toEqual(resource.RESOURCE_CHUNK_GRANTED);
        expect(resource.resource).toEqual(resource.RESOURCE_CHUNK_GRANTED);
    });

    it('parses provided "::" string parameter into namespace/module/resource', () => {
        const resource = new SnpResource('::');
        expect(resource.namespace).toEqual(resource.RESOURCE_CHUNK_GRANTED);
        expect(resource.module).toEqual(resource.RESOURCE_CHUNK_GRANTED);
        expect(resource.resource).toEqual(resource.RESOURCE_CHUNK_GRANTED);
    });

    it('parses provided "::employees" string parameter into namespace/module/resource', () => {
        const resource = new SnpResource('::employees');
        expect(resource.namespace).toEqual(resource.RESOURCE_CHUNK_GRANTED);
        expect(resource.module).toEqual(resource.RESOURCE_CHUNK_GRANTED);
        expect(resource.resource).toEqual('employees');
    });

    it('parses provided ":human-resources:employees" string parameter into namespace/module/resource', () => {
        const resource = new SnpResource(':human-resources:employees');
        expect(resource.namespace).toEqual(resource.RESOURCE_CHUNK_GRANTED);
        expect(resource.module).toEqual('human-resources');
        expect(resource.resource).toEqual('employees');
    });
});
