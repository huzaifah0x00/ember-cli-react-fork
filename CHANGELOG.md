## [3.1.0] - 2022-05-25
- Added useEmberService and useEmberLookup hooks
- remove the emberOwner prop in favor of using hooks (useEmberService, useEmberLookup)

## [3.0.4] - 2022-04-15

- add emberOwner prop to all components ( allows using ember's DI factory )

## [3.0.3] - 2022-04-04

- nothing significant... just updated yarn.lock

## [3.0.2] - 2022-04-01

- remove react 18 from supported versions ( requires R&D to see if it's compatible )

## [3.0.1] - 2022-04-01

- Bugfix: missing peer dependencies

## [3.0.0] - 2022-04-01

- **Breaking change:** remove ability to invoke `{{ react-component "SayHi" }}` directly by passing the react component name as a string.
- Update all components to using glimmer components. ( This should not affect any usage, this is only a change in the core components )
- update old package.json dependencies.

## [2.0.1] - 2021-09-11

- Try importing Ember internals one by one instead of using hardcoded version number.

## [2.0.0] - 2021-09-09

- **Breaking change:** bump minimum NodeJS to v10
- **Breaking change:** replace `broccoli-react` with `broccoli-babel-transpiler` [#50](https://github.com/AltSchool/ember-cli-react/pull/50)
- **Breaking change:** rename npm package to `ember-cli-react-fork`
- Support React v17 as peer dependency

## [1.0.4] - 2018-12-10

- Switch back to yarn for now

## [1.0.3] - 2019-12-10

- Support Ember 3.6 [#48](https://github.com/AltSchool/ember-cli-react/pull/48)

## [1.0.2] - 2018-10-08

- Support React v16 as peer dependency [#41](https://github.com/AltSchool/ember-cli-react/pull/41)

## [1.0.1] - 2018-10-04

- Add `ember-auto-import` to support import of other react ecosystem libraries [#38](https://github.com/AltSchool/ember-cli-react/pull/38)

## [1.0.0] - 2018-07-17

- Show component name in React dev tools [#24](https://github.com/AltSchool/ember-cli-react/pull/24)
- Do not pass `children` to react component when not in block form [#26](https://github.com/AltSchool/ember-cli-react/pull/26)
- **Breaking change:** replace `ember-browserify` with `ember-auto-import` [#27](https://github.com/AltSchool/ember-cli-react/pull/27)
- Support PascalCase file naming convention for React components [#32](https://github.com/AltSchool/ember-cli-react/pull/32)

## [0.3.1] - 2018-05-16

- ...
