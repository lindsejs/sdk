
# Boundless SDK
![Logo](http://boundlessgeo.github.io/sdk/book/styles/boundless_sdk_horiz.svg)

[![Travis CI Status](https://secure.travis-ci.org/boundlessgeo/sdk.svg)](http://travis-ci.org/#!/boundlessgeo/sdk)
[![Coverage Status](https://coveralls.io/repos/github/boundlessgeo/sdk/badge.svg?branch=master)](https://coveralls.io/github/boundlessgeo/sdk?branch=master)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Javascript SDK based on React, OpenLayers and Redux.

## Getting started with SDK

This guide walks through the steps necessary to create a new React-Redux
project that will feature maps through SDK.

### Please use nvm

The [Node Version Manager](https://github.com/creationix/nvm)
provides a clean and easy way to keep
different versions of NodeJS installed simultaneously.

### Install yarn

Yarn is yet another node package manager. However, it offers a number
of performance features over npm.

```bash
npm install -g yarn
```

### Initialize the new app

```
npx create-react-app sdk-starter
cd sdk-starter
```

### Add the app dependencies

SDK-based apps do require additional dependencies. These include Redux for
managing state and node-sass for preprocessing CSS.

```
yarn add node-sass-chokidar redux react-redux ol ol-mapbox-style
```

### Add sass-building scripts to package.json

This is a modification of the recommendations by the create-react-app authors,
it can be reviewed in more depth [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc).


After `"scripts": {`:

```json
   "build-css": "node-sass-chokidar src/ --include-path node_modules/ -o src/",
   "watch-css": "npm run build-css && node-sass-chokidar src/ --include-path node_modules/ -o src/ --watch --recursive",
```

`App.css` needs to be renamed with the sass extension `App.scss`:

```bash
mv src/App.css src/App.scss
```

### Installing SDK

Only *one* of the following techniques are needed for installing
the SDK.

#### From npm

This is the standard way of installing SDK.
It is appropriate for those looking to develop a quick SDK app
and do not need the latest features from the master branch.

It will install the dist-version of the library.

```bash
yarn add @boundlessgeo/sdk
```

#### From GitHub

This is the way to install SDK if the latest features are needed
or development on SDK is planned.

The following steps will clone SDK, install its dependencies,
build the library, and finally add it to the app.

```bash
cd ..
git clone https://github.com/boundlessgeo/sdk
cd sdk
npm install
npm run build:dist
cd ../sdk-starter
yarn add file:../sdk/dist
```

## Add a basic map:

### Add SDK Sass to the project

In your favorite editor open `src/App.scss`. On the first line add:

```css
@import "@boundlessgeo/sdk/stylesheet/sdk.scss";
```

Build the CSS files:

```bash
yarn run build-css
```

### Import SDK and Redux

Open `src/App.js` in your favorite editor. After the line `import './App.css';`,
add the following imports:


```javascript
import { createStore, combineReducers } from 'redux';

import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import * as SdkMapActions from '@boundlessgeo/sdk/actions/map';
```

### Create a new store with the map reducer.

After the imports add a store with the `SdkMapReducer`:
```javascript
const store = createStore(combineReducers({
  'map': SdkMapReducer,
}));
```
### Configuring the initial map

The map configuration needs to happen outside of the `render()` method.
`render()` will be called every time a prop or state element is changed
and this would cause map layers to be added repeatedly causing ill effects.
However, `componentDidMount` is only called once, after the component has been
mounted.

After `class App extends Component {`, add the following lines:

```javascript
componentDidMount() {
  // add the OSM source
  store.dispatch(SdkMapActions.addOsmSource('osm'));

  // add an OSM layer
  store.dispatch(SdkMapActions.addLayer({
    id: 'osm',
    source: 'osm',
  }));
}
```

### Add the map component to the application

After the last `</p>` tag add the following to add an SDK map:

```javascript
<SdkMap store={store} />
```

### Eject and change the webpack configuration

Because there are some dependencies that are published as ES6, we need to have `babel-loader` process them in webpack. Unfortunately this currently requires ejecting our app.

1. `yarn eject`
2. `yarn add babel-loader`
3. Modify `config/webpack.config.dev.js` and `config/webpack.config.prod.js`.

    This section defines which files Babel will transform (search for `babel-loader`):
    ```javascript
      // Process JS with Babel.
      {
        test: /\.(js|jsx|mjs)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        ...
      },
    ```

    The include path must be changed from:
    ```
    include: paths.appSrc,
    ```
    To:
    ```
    include: [paths.appSrc, path.resolve(__dirname, '../node_modules/@mapbox/mapbox-gl-style-spec'), path.resolve(__dirname, '../node_modules/ol-mapbox-style')],
    ```

### Fire up the browser

The create-react-app creates a built-in hot-compiler and server.
```
yarn start
```

## Fin!

Congratulations! You should have a fully operational Boundless SDK React app!

### Unit testing
If you want to write unit tests in your application that use the SDK, make sure you have ```canvas``` installed as a ```devDependency```.
See [here](https://github.com/boundlessgeo/sdk/blob/master/DEVELOPING.md#testing-and-the-canvas-module) for more details.
