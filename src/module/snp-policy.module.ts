import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {SnpPolicyService} from './service/policy.service';
import {SnpConfig} from './definitions/config';
import {CONFIG} from './config/config';
import {SnpPolicyConfiguration} from './definitions/policy-configuration';

// Export module's public API
export {SnpPolicyService} from './service/policy.service';
export {SnpPolicyConstraint} from './definitions/policy-constraint';
export {SnpConfig} from './definitions/config';
export {SnpPolicy} from './definitions/policy';
export {SnpResource} from './definitions/resource';
export {SnpStatement} from './definitions/statement';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        SnpPolicyService
    ]
})
export class SnpModule {
    static forRoot(externalConfig: SnpConfig = null): ModuleWithProviders {
        return {
            ngModule: SnpModule,
            providers: [
                {
                    provide: SnpPolicyConfiguration,
                    useFactory() {
                        const snpConfig: SnpConfig = Object.assign({}, CONFIG, externalConfig);
                        SnpPolicyService.config = snpConfig;
                        return snpConfig;
                    }
                },
                SnpPolicyService
            ]
        };
    }
}
