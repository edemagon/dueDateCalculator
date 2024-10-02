"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueDateCalculator = void 0;
var DueDateCalculator = /** @class */ (function () {
    function DueDateCalculator() {
        this.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS = 'Please report your issue between Monday and Friday';
        this.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS = 'Please report your issue between 9AM and 5PM';
        this.ERROR_SUBMITTING_NEGATIVE_NULL_TURNAROUND = 'Please use a positive turnaround time';
        this.nonWorkingDays = [0, 6];
        this.WorkHoursStart = 9;
        this.WorkHoursEnd = 17;
        this.weekWorkHours = 40;
        this.dayWorkHours = 8;
    }
    DueDateCalculator.prototype.calculateDueDateTime = function (submitDate, turnAround) {
        if (turnAround <= 0) {
            throw new Error(this.ERROR_SUBMITTING_NEGATIVE_NULL_TURNAROUND);
        }
        if (this.nonWorkingDays.includes(submitDate.getDay())) {
            throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS);
        }
        if (submitDate.getHours() < this.WorkHoursStart || submitDate.getHours() >= this.WorkHoursEnd) {
            throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS);
        }
        var dueDate = new Date(submitDate);
        var remainingWorkHours = turnAround;
        var fullWeeks = Math.floor(turnAround / this.weekWorkHours);
        remainingWorkHours = turnAround % this.weekWorkHours;
        dueDate.setDate(dueDate.getDate() + 7 * fullWeeks);
        var fullDays = Math.floor(remainingWorkHours / this.dayWorkHours);
        remainingWorkHours = remainingWorkHours % this.dayWorkHours;
        dueDate.setDate(dueDate.getDate() + 1 * fullDays);
        dueDate.setHours(dueDate.getHours() + remainingWorkHours);
        if (dueDate.getHours() >= 17) {
            dueDate.setHours(dueDate.getHours() + 16);
        }
        if (dueDate.getDay() == 6 || (dueDate.getDay() < submitDate.getDay()) || ((dueDate.getDay() == submitDate.getDay()) && (dueDate.getHours() < submitDate.getHours()))) {
            dueDate.setDate(dueDate.getDate() + 2);
        }
        return dueDate;
    };
    return DueDateCalculator;
}());
exports.DueDateCalculator = DueDateCalculator;
