var assert = require('assert');
var random = require('../index.js').random
var ParamChecker = require('../index.js').ParamChecker
var ParamsFromFileOrObject = require('../index.js').ParamsFromFileOrObject

describe('tools - random', function () {
    describe('random(4, 10)', function () {
        it('should have all values between the min and max bounds (4, 10)', function () {
            let results = []

            for (let i = 0; i < 5000; i++) {
                results.push(random(4, 10))
            }
            results.sort((a, b) => a - b)
            assert(results[0] >= 4, "Inferior bound shouldn't be lower than 4 (found " + results[0] + ")");
            assert(results[results.length - 1] <= 10, "Superior bound shouldn't be greater than 10 (found " + results[results.length - 1] + ")");
        });
    });
    describe('random(6)', function () {
        it('should have all values between the min and max bounds (1, 6)', function () {
            let results = []

            for (let i = 0; i < 5000; i++) {
                results.push(random(6))
            }
            results.sort((a, b) => a - b)
            assert(results[0] >= 1, "Inferior bound shouldn't be lower than 1 (found " + results[0] + ")");
            assert(results[results.length - 1] <= 6, "Superior bound shouldn't be greater than 6 (found " + results.length - 1 + ")");
        });
    });
});

describe('tools - paramChecker class', function () {
    let TestClass;
    before(function initTestClass() {
        TestClass = class extends ParamChecker {
            //list of needed params
            get neededParams() {
                return [
                    "testParam1",
                    "testParam2",
                    "testParam3"
                ]
            }

            //class name for errors and other dev related messages
            get className() {
                return "TestClass"
            }
        }
    });
    describe('create with good parameters', function () {
        it('should be created', function () {
            assert.doesNotThrow(
                () => new TestClass({
                    testParam1: true,
                    testParam2: "pouet",
                    testParam3: "re-pouet"
                }),
                TypeError,
                'Issue with simple creation'
            );
        });
        it('should be created with despite falsy params value', function () {
            assert.doesNotThrow(
                () => new TestClass({
                    testParam1: false,
                    testParam2: "",
                    testParam3: 0
                }),
                TypeError,
                "It should have found parameters despite being falsy"
            );
        });
    }); describe('create with missing/no parameters', function () {
        it('should throw an error', function () {
            assert.throws(
                () => new TestClass({
                    testParam1: false,
                    testParam2: ""
                }),
                TypeError,
                'It should have throw an error'
            );
        });
        it('should throw an error', function () {
            assert.throws(
                () => new TestClass(),
                TypeError,
                'It should have throw an error'
            );
        });
    });
});


describe('tools - ParamsFromFileOrObject class', function () {
    let TestClass;
    before(function initTestClass() {
        TestClass = class extends ParamsFromFileOrObject {
            //list of needed params
            get neededParams() {
                return [
                    "testParam1",
                    "testParam2",
                    "testParam3"
                ]
            }

            //class name for errors and other dev related messages
            get className() {
                return "TestClass2"
            }
        }
    });
    describe('create from params files', function () {
        it('should be created correctly from file', function () {
            assert.doesNotThrow(
                () => new TestClass('./test/paramsFileGood.json'),
                TypeError,
                'Issue with simple creation'
            );
        });
        it('should throw an error', function () {
            assert.throws(
                () => new TestClass('./test/paramsFileBad.json'),
                TypeError,
                'It should have throw an error'
            );
        });
    });
    describe('create from params object', function () {
        it('should be created correctly from object', function () {
            assert.doesNotThrow(
                () => new TestClass({
                    testParam1: true,
                    testParam2: "pouet",
                    testParam3: "re-pouet"
                }),
                TypeError,
                'Issue with simple creation'
            );
        });
        it('should throw an error cause a param is missing', function () {
            assert.throws(
                () => new TestClass({
                    testParam1: true,
                    testParam2: "pouet"
                }),
                TypeError,
                'It should have throw an error'
            );
        });
        it('should throw an error cause undefined params', function () {
            assert.throws(
                () => new TestClass(),
                TypeError,
                'It should have throw an error'
            );
        });
    });
});