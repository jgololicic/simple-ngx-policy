import {TestBed} from '@angular/core/testing';
import {SnpModule} from './snp-policy.module';

describe('SnpPolicy.module', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SnpModule.forRoot(),
            ]
        });
    });

    it(`has default configuration`, () => {
    });
});
