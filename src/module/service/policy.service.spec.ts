import {inject, TestBed} from '@angular/core/testing';

import {SnpPolicyService} from './policy.service';
import {SnpPolicy} from '../definitions/policy';
import {SnpModule} from '../snp-policy.module';
import {SnpConfig} from '../../';
import {SnpStatement} from '../definitions/statement';
import {SnpResource} from '../definitions/resource';
import {SnpPolicyConfiguration} from '../definitions/policy-configuration';
import {SnpPolicyConstraint} from '../definitions/policy-constraint';

describe('SnpPolicyService', () => {
    let policyService: SnpPolicyService;
    let defaultStatement: SnpStatement;
    let defaultResource: SnpResource;
    let moduleConfiguration: SnpConfig = null;
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [],
            imports: [
                SnpModule.forRoot(moduleConfiguration)
            ]
        });

        policyService = TestBed.get(SnpPolicyService);
        defaultStatement = new SnpStatement();
        defaultResource = new SnpResource();
    });

    describe(`Has 'providePolicy' static method which`, () => {

        it(`Provides 'empty' SnpPolicy when called with no parameters`,
            inject([SnpPolicyConfiguration], (config: SnpConfig) => {
                const policy = SnpPolicyService.providePolicy();
                const emptyPolicy = new SnpPolicy(defaultStatement, defaultResource, config.defaultPolicyConstraint);
                expect(policy).toEqual(emptyPolicy)
            }));

        it(`Uses default config 'defaultPolicyConstraint' when no constraint is specified in SnpModule.forRoot(config: SnpConfig)`,
            inject([SnpPolicyConfiguration], (config: SnpConfig) => {
                const policy = SnpPolicyService.providePolicy();
                expect(policy.constrains).toBe(config.defaultPolicyConstraint);
            }));

        it(`Accepts constraint and provides a policy with given constraint`,
            inject([SnpPolicyConfiguration], (config: SnpConfig) => {
                const constraint = SnpPolicyConstraint.DISALLOW;
                const policy = SnpPolicyService.providePolicy(
                    'it-department:salaries:read',
                    'nsp:it-department/salaries/2017-09',
                    constraint
                );
                expect(policy.constrains).not.toBe(config.defaultPolicyConstraint);
                expect(policy.constrains).toBe(constraint);
            }));

        it('Provides SnpStatement and SnpResource from parameter strings', () => {
            const policy = SnpPolicyService.providePolicy('human-resources:employees:read', 'nms:human-resources:employees');
            expect(policy.resource.namespace).toEqual('nms');
            expect(policy.statement.module).toEqual('human-resources');
        });
    });

    describe(`Has 'canAccess' static method which compares SnpPolicy against a list of SnpPolicies[]`, () => {
        describe(`When SnpModules' 'defaultPolicyConstraint' is configured to 'ALLOW' (default)`, () => {

            it(`Returns TRUE for 'empty' policy and 'empty list'`, () => {
                const policy = SnpPolicyService.providePolicy();
                const decision = policyService.canAccess(policy);
                expect(decision).toEqual(true);
            });

            it(`Returns FALSE for 'empty' policy and 'empty list' when policies' constraint is DISALLOW`, () => {
                const policy = SnpPolicyService.providePolicy(null, null, SnpPolicyConstraint.DISALLOW);
                const decision = policyService.canAccess(policy);
                expect(decision).toEqual(false);
            });

            it(`Returns TRUE for 'empty' policy and 'empty list' when policies' constraint is ALLOWED`, () => {
                const policy = SnpPolicyService.providePolicy(null, null, SnpPolicyConstraint.ALLOWED);
                const decision = policyService.canAccess(policy);
                expect(decision).toEqual(true);
            });


            it(`Returns TRUE for empty 'policy' when list is provided (not empty)`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy();
                const decision = policyService.canAccess(policy, listOfPolicies);
                expect(decision).toEqual(true);
            });

            it(`Returns FALSE for empty 'policy' with constraints set to DISALLOW when list is provided (not empty)`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy(null, null, SnpPolicyConstraint.DISALLOW);
                const decision = policyService.canAccess(policy, listOfPolicies);
                expect(decision).toEqual(false);
            });

            it(`Returns TRUE for empty 'policy' with constraints set to ALLOWED when list is provided (not empty)`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy(null, null, SnpPolicyConstraint.ALLOWED);
                const decision = policyService.canAccess(policy, listOfPolicies);
                expect(decision).toEqual(true);
            });


            it(`Returns TRUE if the policy is not in the list`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy('it-department:salaries:read');
                let decision = policyService.canAccess(policy, listOfPolicies);
                expect(decision).toEqual(true);

                const policyWithResource = SnpPolicyService.providePolicy(
                    'it-department:salaries:read',
                    'nsp:it-department/salaries/2017-09'
                );
                decision = policyService.canAccess(policyWithResource);
                expect(decision).toEqual(true);
            });

            it(`Returns FALSE if the policy with constraint DISALLOW is not in the list`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy('it-department:salaries:read', null, SnpPolicyConstraint.DISALLOW);
                let decision = policyService.canAccess(policy, listOfPolicies);
                expect(decision).toEqual(false);

                const policyWithResourceAndConstraint = SnpPolicyService.providePolicy(
                    'it-department:salaries:read',
                    'nsp:it-department/salaries/2017-09',
                    SnpPolicyConstraint.DISALLOW
                );
                decision = policyService.canAccess(policyWithResourceAndConstraint);
                expect(decision).toEqual(false);
            });

            it(`Returns TRUE if the policy's statement is on the list AND policy's resources match`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:employees'
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(true);
            });

            it(`Returns TRUE if the policy's statement is on the list AND policy's resources match AND policy's constraint is DISALLOW`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:employees',
                    SnpPolicyConstraint.DISALLOW
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(true);
            });

            it(`Returns TRUE if the policy's statement is on the list AND policy's resources match AND policy's constraint is ALLOWED`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:employees',
                    SnpPolicyConstraint.ALLOWED
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(true);
            });

            it(`Returns FALSE if the policy's statement is on the list BUT resources does not match`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:salaries'
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(false);
            });

            it(`Returns FALSE if the policy's statement is on the list BUT resources does not match and policy's constraint is DISALLOW`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:salaries',
                    SnpPolicyConstraint.DISALLOW
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(false);
            });

            it(`Returns FALSE if the policy's statement is on the list BUT resources does not match and policy's constraint is ALLOWED`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:salaries',
                    SnpPolicyConstraint.ALLOWED
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(false);
            });
        });

        describe(`When SnpModule 'defaultPolicyConstraint' is configured to 'DISALLOW' (provided in SnpModule.forRoot(config: SnpConfig))`, () => {
            beforeAll(() => {
                moduleConfiguration = {defaultPolicyConstraint: SnpPolicyConstraint.DISALLOW};
            });

            it(`Returns FALSE for 'empty' policy when list is not provided`, () => {
                const policy = SnpPolicyService.providePolicy();
                const decision = policyService.canAccess(policy);
                expect(decision).toEqual(false);
            });

            it(`Returns TRUE for 'empty' policy with constraints ALLOW when list is not provided`, () => {
                const policy = SnpPolicyService.providePolicy(null, null, SnpPolicyConstraint.ALLOWED);
                const decision = policyService.canAccess(policy);
                expect(decision).toEqual(true);
            });

            it(`Returns FALSE for empty policy when list is provided (not empty)`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy();
                const decision = policyService.canAccess(policy);
                expect(decision).toEqual(false);
            });

            it(`Returns TRUE for empty with constraint ALLOWED policy when list is provided (not empty)`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy(null, null, SnpPolicyConstraint.ALLOWED);
                const decision = policyService.canAccess(policy);
                expect(decision).toEqual(true);
            });

            it(`Returns FALSE if policy is not in the list`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy('it-department:salaries:read');
                let decision = policyService.canAccess(policy);
                expect(decision).toEqual(false);

                const policyWithResource = SnpPolicyService.providePolicy(
                    'it-department:salaries:read',
                    'nsp:it-department/salaries/2017-09'
                );
                decision = policyService.canAccess(policyWithResource);
                expect(decision).toEqual(false);
            });

            it(`Returns TRUE if policy with constraint ALLOW is not in the list`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policy = SnpPolicyService.providePolicy('it-department:salaries:read', '', SnpPolicyConstraint.ALLOWED);
                let decision = policyService.canAccess(policy);
                expect(decision).toEqual(true);

                const policyWithResource = SnpPolicyService.providePolicy(
                    'it-department:salaries:read',
                    'nsp:it-department/salaries/2017-09',
                    SnpPolicyConstraint.ALLOWED
                );
                decision = policyService.canAccess(policyWithResource);
                expect(decision).toEqual(true);
            });

            it(`Returns TRUE if policy's statement is on the list AND policy's resources match`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:employees'
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(true);
            });

            it(`Returns TRUE if policy's statement is on the list AND policy's resources match AND policy's constraints is DISALLOW `, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:employees',
                    SnpPolicyConstraint.DISALLOW
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(true);
            });

            it(`Returns FALSE if the policy's statement is on the list BUT resources does not match`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:salaries'
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(false);
            });

            it(`Returns FALSE if the policy's statement is on the list BUT resources does not match AND policy's constraint is ALLOWED`, () => {
                const listOfPolicies: SnpPolicy[] = [];
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:read', 'nsp:human-resources:employees'));
                listOfPolicies.push(SnpPolicyService.providePolicy('human-resources:employees:write', 'nsp:human-resources:employees'));

                const policyWithResource = SnpPolicyService.providePolicy(
                    'human-resources:employees:read',
                    'nsp:human-resources:salaries',
                    SnpPolicyConstraint.ALLOWED
                );
                const decision = policyService.canAccess(policyWithResource, listOfPolicies);
                expect(decision).toEqual(false);
            });
        });
    });
});
