"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueDateCalculator = void 0;
var DueDateCalculator = /** @class */ (function () {
    function DueDateCalculator() {
        this.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS = 'Please report your issue between Monday and Friday';
        this.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS = 'Please report your issue between 9AM and 5PM';
        this.nonWorkingDays = [0, 6];
        this.workingHoursStart = 9;
        this.workingHoursEnd = 17;
    }
    DueDateCalculator.prototype.calculateDueDateTime = function (submitDate, turnAround) {
        if (this.nonWorkingDays.includes(submitDate.getDay())) {
            throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS);
        }
        if (submitDate.getHours() < this.workingHoursStart || submitDate.getHours() >= this.workingHoursEnd) {
            throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS);
        }
        var dueDate = submitDate;
        // dueDate = add turnAround hours to submitDate
        // if dueDate is past 5pm, add 16 hours
        return dueDate;
    };
    return DueDateCalculator;
}());
exports.DueDateCalculator = DueDateCalculator;
