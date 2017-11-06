karma-firebase :fire: 
[![CircleCI](https://circleci.com/gh/Orlandster1998/karma-firebase/tree/master.svg?style=shield)](https://circleci.com/gh/Orlandster1998/karma-firebase/tree/master)(https://circleci.com/gh/Orlandster1998/karma-firebase/tree/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ae1d9a0b1ec145da90585e8d3646a72f)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Orlandster1998/karma-firebase&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/karma-firebase.svg)](https://badge.fury.io/js/karma-firebase)
===========

A simple plugin for `integration` and `e2e` testing with Firebase. The plugin is based on `firebase-server`.

# Installation
The easiest way is to install `karma-firebase` is by doing the following way:

```bash
$ npm install karma-firebase --save-dev
```

# Configuration
Once `karma-firebase` is installed you can make use of it by adding the plugin to your karma configuration file.

### `karma.conf.js`

```js
module.exports = function(config) {
  config.set({
    
    // add karma-firebase to the plugins array
    plugins: [
      'karma-firebase'
    ],

    // execute the plugin before karma's middleware
    beforeMiddleware: ['firebase'],

    // add your config
    firebase: {
    
      // set the port of the websocket server
      port: 4500,

      // add initial data to the database
      data: {
        name: 'John Doe',
        age: '24'
      },
    },
  })
}
```

You are able to configure the plugin within the `firebase` property.

| Property | Description                                  | default value |
|----------|----------------------------------------------|---------------|
| port     | The port to launch `firebase-server`.        | 5000          |
| data     | Initial data to load `firebase-server` with. | {}            |

## Usage

Once the configuration is ready you can make use of the `firebase-server` within your tests.

Simply initialize the firebase app the following way:

```js
// initialize firebase with the port you've specified
firebase.initializeApp({ databaseURL: 'ws://127.0.1:4500' });

// simply create a database reference
ref = firebase.app().database().ref();

// ... and happy testing
```

## License
MIT