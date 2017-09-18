import { AngularCLIPage } from './app.po';

describe('angular-cli App', function() {
  let page: AngularCLIPage;

  beforeEach(() => {
    page = new AngularCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
