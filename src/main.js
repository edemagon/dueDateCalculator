"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueDateCalculator = void 0;
var DueDateCalculator = /** @class */ (function () {
    function DueDateCalculator() {
        this.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS = 'Please report your issue between 9AM and 5PM';
        this.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS = 'Please report your issue between Monday and Friday';
    }
    DueDateCalculator.prototype.calculateDueDateTime = function (submitDate, turnAround) {
        return new Date();
    };
    return DueDateCalculator;
}());
exports.DueDateCalculator = DueDateCalculator;
