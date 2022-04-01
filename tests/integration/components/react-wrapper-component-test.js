import { click, fillIn, getResolver, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ReactResolver from 'ember-cli-react/resolver';
import { setupRenderingTest } from 'ember-qunit';
import { assert, module, test } from 'qunit';
import React from 'react';
import sinon from 'sinon';

module('Integration | Component | react-wrapper-component', function (hooks) {
  setupRenderingTest(hooks);

  // This test is skipped because the render function does not throw an exception, and requires additional setup.
  test.skip('react-wrapper-component cannot be used directly', async function (assert) {
    try {
      await render(hbs`{{react-wrapper-component "say-hi"}}`);
    } catch (e) {
      assert.ok(true);
    }

    assert.ok(false); // should not reach here
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

  test('supports props.children', async function (assert) {
    this.name = 'Noctis';
    await render(
      hbs`
      <TheWrapper>
        <SayHi @name={{this.name}}></SayHi>
      </TheWrapper>
      `
    );

    assert.dom(this.element).hasText('Content: Hello Noctis');
  });

  test('supports props.children and rerender', async function (assert) {
    this.set('name', 'Noctis');

    await render(
      hbs`
      <TheWrapper>
        <SayHi @name={{this.name}}></SayHi>
      </TheWrapper>
      `
    );

    this.set('name', 'Gladiolus');

    assert.dom(this.element).hasText('Content: Hello Gladiolus');
  });

  test('supports wrapping Ember components', async function (assert) {
    this.name = 'Ignis';
    await render(hbs`<TheWrapper>
      <EmberSayHi @name={{this.name}}></EmberSayHi>
    </TheWrapper>`);

    assert.dom(this.element).hasText('Content: Hello Ignis');
  });

  test('supports wrapping Ember components and rerender', async function (assert) {
    this.set('name', 'Ignis');

    await render(hbs`<TheWrapper>
      <EmberSayHi @name={{this.name}}></EmberSayHi>
    </TheWrapper>`);

    this.set('name', 'Prompto');

    assert.dom(this.element).hasText('Content: Hello Prompto');
  });

  test('it supports wrapping text node', async function (assert) {
    this.set('value', 'Ancient');
    await render(hbs`<TheWrapper>{{this.value}}</TheWrapper>`);

    assert.dom(this.element).hasText('Content: Ancient');
  });

  test('it supports wrapping text node and rerender', async function (assert) {
    this.set('value', 'Ancient');

    await render(hbs`<TheWrapper>{{this.value}}</TheWrapper>`);

    this.set('value', 'Modern');

    assert.dom(this.element).hasText('Content: Modern');
  });

  test('supports interleaving React and Ember components', async function (assert) {
    this.set('name', 'Luna');
    await render(hbs`<EmberBox>
      <TheWrapper>
        <EmberSayHi @name={{this.name}} />
      </TheWrapper>
    </EmberBox>`);

    assert.dom(this.element).hasText('Content: Hello Luna');
  });

  test('supports interleaving React and Ember components and rerender', async function (assert) {
    this.set('name', 'Luna');

    await render(hbs`<EmberBox>
      <TheWrapper>
        <EmberSayHi @name={{this.name}} />
      </TheWrapper>
    </EmberBox>`);

    this.set('name', 'Iris');

    assert.dom(this.element).hasText('Content: Hello Iris');
  });

  test('supports mutating children structure', async function (assert) {
    this.set('isComing', true);

    await render(hbs`<TheWrapper>
      <div>
        {{#if this.isComing}}
          <EmberSayHi @name="Ignis" />

        {{else}}
          See ya!
        {{/if}}
      </div>
    </TheWrapper>`);

    assert.dom(this.element).hasText('Content: Hello Ignis');
    this.set('isComing', false);
    assert.dom(this.element).hasText('Content: See ya!');
  });

  test('supports function as child component', async function (assert) {
    this.set('renderChildren', (text) => React.createElement('span', null, `FACC is ${text}!!!`));

    await render(hbs`<FaccWrapper @children={{this.renderChildren}}></FaccWrapper>`);

    assert.dom(this.element).hasText('Warning: FACC is supported but anti-pattern!!!');
  });

  test('does not create YieldWrapper when there is no child', async function (assert) {
    await render(hbs`<NoYieldWrapper />`);
    // If YieldWrapper is created, it will not render correctly.
    assert.dom(this.element).hasText('Rendered correctly');
  });

  test('does not create YieldWrapper when there is no child, but the component has children inside', async function (assert) {
    await render(hbs`<NoYieldWrapperWithOwnChildren />`);

    // If YieldWrapper is created, it will not render correctly.
    const anchors = this.element.querySelectorAll('a');
    assert.equal(anchors.length, 2);
    assert.dom(anchors[0]).hasText('Link 1');
    assert.dom(anchors[1]).hasText('Link 2');
  });

  test('does not create YieldWrapper when there is no child, even after rerendering', async function (assert) {
    this.set('text', 'show me!');
    await render(hbs`<NoYieldWrapperWithProps @text={{this.text}} />`);

    // If YieldWrapper is created, it will not render correctly.
    assert.dom(this.element).hasText('Rendered correctly with "show me!"');

    // This test is needed because on a re-render, there is already a
    // non-comment child node (span) created by React. So simply checking
    // single comment node won't work.
    this.set('text', 'rerender me!');
    assert.dom(this.element).hasText('Rendered correctly with "rerender me!"');
  });

  test('rerenders on state change', async function (assert) {
    await render(hbs`<SayHi @name={{this.name}} />`);
    this.set('name', 'Owen');
    assert.dom(this.element).hasText('Hello Owen');
  });

  test('rerenders when mutable state changes', async function () {
    await render(hbs`
      <Input aria-label="test" @value={{this.name}} />
      <SayHi @name={{this.name}} />
    `);

    await fillIn('input', 'Noah');
    assert.dom(this.element).hasText('Hello Noah');
  });

  test('can use actions from action helper', async function (assert) {
    const clickActionHandler = sinon.stub();
    this.set('didClickButton', clickActionHandler);

    await render(hbs`<FancyButton @onClick={{this.didClickButton}} />`);

    await click('button');
    assert.true(clickActionHandler.called);
  });

  // This is no longer supported
  // test('supports dynamically defined react component name', async function(assert) {
  //   this.set('reactComponentName', 'say-hi');
  //   await render(hbs`{{react-component reactComponentName}}`);
  //   expect(this.element.querySelectorAll('.SayHi')).to.have.length(1);
  //   this.set('reactComponentName', 'fancy-button');
  //   expect(this.element.querySelectorAll('.FancyButton')).to.have.length(1);
  // });

  module('ember-cli-react resolver', function () {
    test('supports React-style component file name', async function (assert) {
      await render(hbs`<ReactStyleFileName />`);

      assert.dom(this.element).hasText('My file name is ReactStyleFileName');
    });

    test('supports React-style component file name, but render with Ember style name', async function (assert) {
      await render(hbs`{{react-style-file-name}}`);

      assert.dom(this.element).hasText('My file name is ReactStyleFileName');
    });

    test('supports React-style component file name even without dash', async function (assert) {
      await render(hbs`{{card}}`);

      assert.dom(this.element).hasText('I am a Card component, I have no dash!');
    });

    test('supports React-style component file name with namespace', async function (assert) {
      await render(hbs`<Namespace::InsideNamespace />`);

      assert.dom(this.element).hasText('I am inside a namespace!');
    });

    module('when both `SameNameJsx.jsx` and `same-name-jsx.jsx` exist', function () {
      test('prioritises React-style file name (SameNameJsx.jsx)', async function (assert) {
        await render(hbs`<SameNameJsx />`);

        assert.dom(this.element).hasText('My file name is "SameNameJsx.jsx"');
      });

      test('prioritises React-style file name (SameNameJsx.jsx) when render with Ember-style name', async function (assert) {
        await render(hbs`{{same-name-jsx}}`);

        assert.dom(this.element).hasText('My file name is "SameNameJsx.jsx"');
      });
    });

    module(
      'when both `SameNameDifferentCaseMixed.jsx` and `same-name-different-case-mixed.js` (Ember) exist',
      function () {
        test('prioritises the React component (SameNameDifferentCaseMixed.jsx)', async function (assert) {
          await render(hbs`<SameNameDifferentCaseMixed />`);

          assert.dom(this.element).hasText('My file name is "SameNameDifferentCaseMixed.jsx"');
        });

        test('prioritises the React component (SameNameDifferentCaseMixed.jsx) when render with Ember-style name', async function (assert) {
          await render(hbs`{{same-name-different-case-mixed}}`);

          assert.dom(this.element).hasText('My file name is "SameNameDifferentCaseMixed.jsx"');
        });
      }
    );

    // The React file will overwrite Ember file as that's how Broccoli-React works.
    // Skipping this to keep this in mind.
    module.skip(
      'when both `same-name-same-case-mixed.jsx` and `same-name-same-case-mixed.js` (Ember) exist',
      function () {
        test('prioritises the React component (same-name-same-case-mixed.js)', async function (assert) {
          await render(hbs`toberplaced-same-name-same-case-mixed`);

          assert.dom(this.element).hasText('My file name is "same-name-same-case-mixed.jsx"');
        });

        test('prioritises the React component (same-name-same-case-mixed.js) when rendering directly', async function (assert) {
          await render(hbs`{{same-name-ember}}`);

          assert.dom(this.element).hasText('My file name is "same-name-same-case-mixed.jsx"');
        });
      }
    );
  });
});
