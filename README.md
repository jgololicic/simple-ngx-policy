<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/jgololicic/simple-ngx-policy/master/demo/src/assets/logo.svg">
</p>

# simple-ngx-policy - Simple Angular 2+ statement &amp; resource management library

[![npm version](https://badge.fury.io/js/simple-ngx-policy.svg)](https://badge.fury.io/js/simple-ngx-policy),
[![Build Status](https://travis-ci.org/jgololicic/simple-ngx-policy.svg?branch=master)](https://travis-ci.org/jgololicic/simple-ngx-policy)
[![Coverage Status](https://coveralls.io/repos/github/jgololicic/simple-ngx-policy/badge.svg?branch=master)](https://coveralls.io/github/jgololicic/simple-ngx-policy?branch=master)
[![dependency Status](https://david-dm.org/jgololicic/simple-ngx-policy/status.svg)](https://david-dm.org/jgololicic/simple-ngx-policy)
[![devDependency Status](https://david-dm.org/jgololicic/simple-ngx-policy/dev-status.svg?branch=master)](https://david-dm.org/jgololicic/simple-ngx-policy#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/jgololicic/simple-ngx-policy.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://jgololicic.github.io/simple-ngx-policy

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `simple-ngx-policy` via:
```shell
npm install --save simple-ngx-policy
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `simple-ngx-policy`:
```js
map: {
  'simple-ngx-policy': 'node_modules/simple-ngx-policy/bundles/simple-ngx-policy.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { SnpModule } from 'simple-ngx-policy';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` SnpModule .forRoot()`):
```js
import { SnpModule } from 'simple-ngx-policy';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [SnpModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` SnpModule `:

```js
import { SnpModule } from 'simple-ngx-policy';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [SnpModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2017 jgololicic. Licensed under the MIT License (MIT)

