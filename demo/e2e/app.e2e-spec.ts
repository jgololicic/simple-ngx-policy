import { SimpleNgxPolicyDemoPage } from './app.po';

describe('simple-ngx-policy-demo App', () => {
  let page: SimpleNgxPolicyDemoPage;

  beforeEach(() => {
    page = new SimpleNgxPolicyDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
