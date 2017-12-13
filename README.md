# arfost-ntools

[![NPM](https://nodei.co/npm/stealthlog.png?downloads=true&downloadRank=true)](https://nodei.co/npm/arfost-ntools/)

A set of node js tools intended for me to import in each projects
If it can be of any use for you, fell free to use it.

```
npm install --save arfost-ntools
```

## What is in here ?

### random function

```javascript
var random = require('arfost-ntools').random

//for a result between 4 included and 10 included
random(4, 10)

//for a result between 1 included and 6 included
random(6)

```

### param checker classes

```javascript
var ParamChecker = require('../index.js').ParamChecker

var ChildClass = class extends ParamChecker {
            //list of needed params
    get neededParams() {
        return [
            "param1",
            "param2",
            "param3"
        ]
    }

    //class name for errors and other dev related messages
    get className() {
        return "ChildClass"
    }
}

//this will work
new ChildClass({
    param1:"param",
    param2:false,
    param3:0
})

//this will throw a typeError
new ChildClass({
    param1:"param",
    param2:false
})


//another is present with the same logic, but you can send a path to a json parameter files as well as a literal object
var ParamsFromFileOrObject = require('../index.js').ParamsFromFileOrObject

```
