import {Inject, Injectable} from '@angular/core';
import {SnpPolicy} from '../definitions/policy';
import {SnpConfig} from '../../';
import {SnpPolicyConstraint} from '../definitions/policy-constraint';
import {SnpStatement} from '../definitions/statement';
import {SnpResource} from '../definitions/resource';
import {SnpPolicyConfiguration} from '../definitions/policy-configuration';

@Injectable()
export class SnpPolicyService {

    /**
     * Config is provided by SnpModule.forRoot() call.
     */
    public static config: SnpConfig = {};

    public static providePolicy(statement?: string, resource?: string, constraint?: SnpPolicyConstraint): SnpPolicy {

        statement = statement || this.config.defaultStatement;
        resource = resource || this.config.defaultResource;
        const defaultPolicyConstraint: SnpPolicyConstraint = constraint || this.config.defaultPolicyConstraint;
        const policyStatement = new SnpStatement(statement);
        const policyResource = new SnpResource(resource);

        return new SnpPolicy(policyStatement, policyResource, defaultPolicyConstraint);
    }

    public constructor(@Inject(SnpPolicyConfiguration) private config: SnpConfig) {
    }

    public canAccess(policy: SnpPolicy, listOfPolicies: SnpPolicy[] = []): boolean {
        const constraint = policy.constrains;
        if (listOfPolicies.length === 0) {
            return constraint === SnpPolicyConstraint.ALLOWED;
        }

        const listOfMatchedPolicyStatements = this.provideListOfMatchedPoliciesBasedOnStatement(policy, listOfPolicies);
        if (listOfMatchedPolicyStatements.length === 0) {
            return constraint === SnpPolicyConstraint.ALLOWED;
        }

        const listOfMatchedPolicyResources = this.provideListOfMatchedPoliciesBasedOnResource(policy, listOfPolicies);
        return !!listOfMatchedPolicyResources.length;

    }

    private provideListOfMatchedPoliciesBasedOnStatement(policy: SnpPolicy, listOfPolicies: SnpPolicy[]): SnpPolicy[] {
        return listOfPolicies
            .filter(policyCandidate => policyCandidate.constrains === this.config.defaultPolicyConstraint)
            .reduce((matchedPoliciesAccumulator, policyCandidate) => {
                if (this.doPoliciesStatementsMatch(policy, policyCandidate)) {
                    matchedPoliciesAccumulator.push(policyCandidate);
                }
                return matchedPoliciesAccumulator;
            }, []);
    }

    private doPoliciesStatementsMatch(policyA: SnpPolicy, policyB: SnpPolicy): boolean {
        return policyA.statement.module === policyB.statement.module &&
            policyA.statement.component === policyB.statement.component &&
            policyA.statement.action === policyB.statement.action;
    }

    private provideListOfMatchedPoliciesBasedOnResource(policy: SnpPolicy, listOfPolicies: SnpPolicy[]): SnpPolicy[] {
        return listOfPolicies.filter(policyCandidate => this.doPoliciesResourcesMatch(policy, policyCandidate));
    }

    private doPoliciesResourcesMatch(policyA: SnpPolicy, policyB: SnpPolicy): boolean {
        return policyA.resource.namespace === policyB.resource.namespace &&
            policyA.resource.module === policyB.resource.module &&
            policyA.resource.resource === policyB.resource.resource;
    }
}
