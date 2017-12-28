/*
 *  Copyright (C) 2010-2017 Jernej Gololicic <jernej.gololicic@planet-sports.com>
 *
 *  This file is part of quahog.
 *
 *  quahog can not be copied and/or distributed without the express
 *  permission of 21 Run.
 *
 *  jgololicic on 14/12/17 13:35
 *
 */

export class SnpResource {

    public readonly RESOURCE_CHUNK_GRANTED = '*';
    public readonly RESOURCE_CHUNK_SEPARATOR = ':';

    private _namespace: string;
    private _module: string;
    private _resource: string;

    public constructor(resourceString: string = '') {
        this.initResourceFromString(resourceString);
    }

    get namespace(): string {
        return this._namespace;
    }

    get module(): string {
        return this._module;
    }

    get resource(): string {
        return this._resource;
    }

    private initResourceFromString(resource: string): void {
        const explodedStatement = resource.split(this.RESOURCE_CHUNK_SEPARATOR);
        [this._namespace, this._module, this._resource] = Array(3).fill(this.RESOURCE_CHUNK_GRANTED)
            .map((chunk, i) => explodedStatement[i] || chunk);
    }
}
