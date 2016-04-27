var angular = require('angular'),
    AngularES6 = (function() {
        function AngularES6(moduleName, dependancies) {
            dependancies = dependancies || [];

            this.name = moduleName;
            this.angularModule = angular.module(moduleName, dependancies);
        }

        AngularES6.module = function(moduleName, dependancies) {
            dependancies = dependancies || [];

            return new AngularES6(moduleName, dependancies);
        }

        angular.extend(AngularES6.prototype, {
            constant: function(name, value) {
                this.angularModule.constant(name, value);

                return this;
            },
            config: function(configFn) {
                this.angularModule.config(configFn);

                return this;
            },
            controller: function(name, constructorFn) {
                this.angularModule.controller(name, constructorFn);

                return this;
            },
            directive: function(name, constructorFn) {
                var normalizedConstructorFn = this._normalizeConstructor(constructorFn);

                if (!normalizedConstructorFn.prototype.compile) {
                    // create an empty compile function if none was defined.
                    normalizedConstructorFn.prototype.compile = function() {};
                }

                var originalCompileFn = this._cloneFunction(normalizedConstructorFn.prototype.compile);

                // Decorate the compile method to automatically return the link method (if it exists)
                // and bind it to the context of the constructor (so `this` works correctly).
                // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
                // returns `this.link` from within the compile function.
                this._override(normalizedConstructorFn.prototype, 'compile', function() {
                    return function() {
                        originalCompileFn.apply(this, arguments);

                        if (normalizedConstructorFn.prototype.link) {
                            return normalizedConstructorFn.prototype.link.bind(this);
                        }
                    };
                });

                var factoryArray = this._createFactoryArray(constructorFn);

                this.angularModule.directive(name, factoryArray);

                return this;
            },
            factory: function(name, constructorFn) {
                constructorFn = this._normalizeConstructor(constructorFn);

                var factoryArray = this._createFactoryArray(constructorFn);

                this.angularModule.factory(name, factoryArray);

                return this;
            },
            filter: function(name, constructorFn) {
                //filterConstructorFn = this.normalizeConstructor(filterConstructorFn);

                var filterArray = this._createFilterArray(constructorFn);

                this.angularModule.filter(name, filterArray);

                return this;
            },
            service: function(name, constructorFn) {
                this.angularModule.service(name, constructorFn);

                return this;
            },
            provider: function(name, constructorFn) {
                this.angularModule.provider(name, constructorFn);

                return this;
            },
            run: function(initializationFunction) {
                this.angularModule.run(initializationFunction);

                return this;
            },
            _normalizeConstructor: function(inputConstructorFn) {
                var constructorFn;

                if (angular.isArray(inputConstructorFn.constructor)) {
                    var injected = inputConstructorFn.slice(0, inputConstructorFn.length - 1);

                    constructorFn = inputConstructorFn[inputConstructorFn.length - 1];
                    constructorFn.$inject = injected;
                } else {
                    constructorFn = inputConstructorFn;
                }

                return constructorFn;
            },
            /**
             * Convert a constructor function into a factory function which returns a new instance of that
             * constructor, with the correct dependencies automatically injected as arguments.
             *
             * In order to inject the dependencies, they must be attached to the constructor function with the
             * `$inject` property annotation.
             *
             * @param constructorFn
             * @returns {Array.<T>}
             * @private
             */
            _createFactoryArray: function(constructorFn) {
                // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
                var args = constructorFn.$inject || [],
                    factoryArray = args.slice(); // create a copy of the array
                // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
                // dependency, and the final item is the factory function itself.
                factoryArray.push(function(args) {
                    //return new constructorFn(...args);
                    var instance = new constructorFn(args);

                    /*
                    for (var key in instance) {
                        instance[key] = instance[key];
                    }*/

                    return instance;
                });

                return factoryArray;
            },
            createFilterArray: function(constructorFn) {
                // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
                var args = constructorFn.$inject || [],
                    filterArray = args.slice(); // create a copy of the array
                // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
                // dependency, and the final item is the factory function itself.
                filterArray.push(function(args) {
                    //return new constructorFn(...args);
                    var instance = new constructorFn(args);

                    return instance.filter;
                });

                return filterArray;
            },

            /**
             * Clone a function
             * @param original
             * @returns {Function}
             */
            _cloneFunction: function(original) {
                return function() {
                    return original.apply(this, arguments);
                };
            },
            /**
             * Override an object's method with a new one specified by `callback`.
             * @param object
             * @param methodName
             * @param callback
             */
            _override: function(object, methodName, callback) {
                object[methodName] = callback(object[methodName])
            }
        });

        return AngularES6;
    })();

module.exports = AngularES6;