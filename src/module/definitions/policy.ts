/*
 *  Copyright (C) 2010-2017 Jernej Gololicic <jernej.gololicic@planet-sports.com>
 *
 *  jgololicic on 14/12/17 13:33
 *
 */

import { SnpStatement } from './statement';
import { SnpResource } from './resource';
import {SnpPolicyConstraint} from './policy-constraint';


export class SnpPolicy {

    private _statement: SnpStatement;
    private _resource: SnpResource;
    private _constrains: SnpPolicyConstraint;

    public constructor(statement: SnpStatement, resource: SnpResource, constrains: SnpPolicyConstraint) {
        this._statement = statement;
        this._resource = resource;
        this._constrains = constrains;
    }

    get resource(): SnpResource {
        return this._resource;
    }

    get statement(): SnpStatement {
        return this._statement;
    }

    get constrains(): SnpPolicyConstraint {
        return this._constrains;
    }
}
