import {SnpConfig} from '../definitions/config';
import {SnpPolicyConstraint} from '../definitions/policy-constraint';

export const CONFIG: SnpConfig = {
    defaultPolicyConstraint: SnpPolicyConstraint.ALLOWED,
    defaultStatement: '*:*:*',
    defaultResource: '*'
};
