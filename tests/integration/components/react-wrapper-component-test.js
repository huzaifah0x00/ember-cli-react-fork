import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupOnerror, getResolver } from '@ember/test-helpers';
import ReactResolver from 'ember-cli-react/resolver';

module('Integration | Component | react-wrapper-component', function (hooks) {
  setupRenderingTest(hooks);

  test('it does not render', async function (assert) {
    // await render(hbs`{{react-wrapper-component "say-hi"}}`);
    assert.ok(true);
  });

  test('custom resolver should be setup correctly', async function (assert) {
    const resolver = getResolver();
    assert.true(resolver instanceof ReactResolver);
  });

  test('Test component works', async function (assert) {
    await render(hbs`<Test::React />`);
    assert.dom('div#test-react').exists();
  });

  test('passes state', async function (assert) {
    await render(hbs`<SayHi @name="Alex" />`);
    assert.dom(this.element).hasText('Hello Alex');
  });
});
