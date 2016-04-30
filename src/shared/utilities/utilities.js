var angular = require('angular'),
    Utilities = (function() {
        function Utilities() {
            
        }

        angular.extend(Utilities.prototype, {
        	createGuid: function () {
                var s4 = function () {
                    return Math.floor((1 + Math.random()) * 0x10000)
                               .toString(16)
                               .substring(1);
                };
 
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            },
            findIndex: function(array, propertyWithValue) {
                var firstProperty = "";

                for (var property in propertyWithValue) {
                    firstProperty = property;
                    break;
                }

                for (var i = array.length - 1; i >= 0; i--) {
                    if (array[i][firstProperty] === propertyWithValue[firstProperty]) {
                        return i;
                    }
                }
                return -1;
            }
        });

        return Utilities;
    })();

module.exports = new Utilities();