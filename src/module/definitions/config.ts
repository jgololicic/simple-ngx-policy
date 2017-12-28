import {SnpPolicyConstraint} from './policy-constraint';

export interface SnpConfig {
    defaultResource?: string;
    defaultStatement?: string;
    defaultPolicyConstraint?: SnpPolicyConstraint;
}
