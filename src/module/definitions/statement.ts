/*
 *  Copyright (C) 2010-2017 Jernej Gololicic <jernej.gololicic@planet-sports.com>
 *
 *  This file is part of quahog.
 *
 *  quahog can not be copied and/or distributed without the express
 *  permission of 21 Run.
 *
 *  jgololicic on 14/12/17 10:16
 *
 */

export class SnpStatement {
    // public readonly STATEMENT_FORMAT = 'module:component:action';
    // public readonly STATEMENT_ACTION_READ = 'read';
    // public readonly STATEMENT_ACTION_WRITE = 'write';
    public readonly STATEMENT_ACTION_GRANTED = '*';
    public readonly STATEMENT_MODULE_GRANTED = '*';
    public readonly STATEMENT_COMPONENT_GRANTED = '*';
    public readonly STATEMENT_CHUNK_GRANTED = '*';
    public readonly STATEMENT_CHUNK_SEPARATOR = ':';

    private _module: string;
    private _component: string;
    private _action: string;

    public constructor(statement: string = '') {
        this.initStatementFromString(statement);
    }

    get module(): string {
        return this._module;
    }

    set module(value: string) {
        this._module = value;
    }

    get component(): string {
        return this._component;
    }

    set component(value: string) {
        this._component = value;
    }

    get action(): string {
        return this._action;
    }

    set action(value: string) {
        this._action = value;
    }

    private initStatementFromString(statement: string): void {
        const explodedStatement = statement.split(this.STATEMENT_CHUNK_SEPARATOR);
        [this.module, this.component, this.action] = Array(3).fill(this.STATEMENT_CHUNK_GRANTED)
            .map((chunk, i) => explodedStatement[i] || chunk);
    }
}
