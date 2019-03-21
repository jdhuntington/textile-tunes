"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.error = function (arg0) {
        console.error(arg0);
    };
    Logger.prototype.log = function (msg) {
        console.log(msg);
    };
    return Logger;
}());
exports.Logger = Logger;
