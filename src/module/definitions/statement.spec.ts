import {SnpStatement} from './statement';

describe('SnpStatement.class', () => {

    it('parses default parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement();
        expect(statement.module).toEqual(statement.STATEMENT_MODULE_GRANTED);
        expect(statement.component).toEqual(statement.STATEMENT_COMPONENT_GRANTED);
        expect(statement.action).toEqual(statement.STATEMENT_ACTION_GRANTED);
    });

    it('parses provided parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement('someModule:dashboard:read');
        expect(statement.module).toEqual('someModule');
        expect(statement.component).toEqual('dashboard');
        expect(statement.action).toEqual('read');
    });

    it('parses provided "one chunk string" parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement('someModule');
        expect(statement.module).toEqual('someModule');
        expect(statement.component).toEqual(statement.STATEMENT_COMPONENT_GRANTED);
        expect(statement.action).toEqual(statement.STATEMENT_ACTION_GRANTED);
    });

    it('parses provided "two chunk string" parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement('someModule:dashboard');
        expect(statement.module).toEqual('someModule');
        expect(statement.component).toEqual('dashboard');
        expect(statement.action).toEqual(statement.STATEMENT_ACTION_GRANTED);
    });

    it('parses provided "three chunk string" parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement('someModule:dashboard:delete');
        expect(statement.module).toEqual('someModule');
        expect(statement.component).toEqual('dashboard');
        expect(statement.action).toEqual('delete');
    });

    it('parses provided "one chunk and a colon string" parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement('someModule:');
        expect(statement.module).toEqual('someModule');
        expect(statement.component).toEqual(statement.STATEMENT_COMPONENT_GRANTED);
        expect(statement.action).toEqual(statement.STATEMENT_ACTION_GRANTED);
    });

    it('parses provided "one chunk and two colons string" parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement('someModule::');
        expect(statement.module).toEqual('someModule');
        expect(statement.component).toEqual(statement.STATEMENT_COMPONENT_GRANTED);
        expect(statement.action).toEqual(statement.STATEMENT_ACTION_GRANTED);
    });

    it('parses provided "three chunk and two colons string" parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement(':::');
        expect(statement.module).toEqual(statement.STATEMENT_MODULE_GRANTED);
        expect(statement.component).toEqual(statement.STATEMENT_COMPONENT_GRANTED);
        expect(statement.action).toEqual(statement.STATEMENT_ACTION_GRANTED);
    });

    it('parses provided "two colons and a chunk string" parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement('::read');
        expect(statement.module).toEqual(statement.STATEMENT_MODULE_GRANTED);
        expect(statement.component).toEqual(statement.STATEMENT_COMPONENT_GRANTED);
        expect(statement.action).toEqual('read');
    });

    it('parses provided "one colon and two chunks string" parameter into module/component/action/ statement members', () => {
        const statement = new SnpStatement(':dashboard:read');
        expect(statement.module).toEqual(statement.STATEMENT_MODULE_GRANTED);
        expect(statement.component).toEqual('dashboard');
        expect(statement.action).toEqual('read');
    });


});
