export class DueDateCalculator {

  readonly ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS = 'Please report your issue between Monday and Friday';
  readonly ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS = 'Please report your issue between 9AM and 5PM';
  readonly ERROR_SUBMITTING_NEGATIVE_NULL_TURNAROUND = 'Please use a positive turnaround time';
  private nonWorkingDays = [0,6];
  private WorkHoursStart = 9;
  private WorkHoursEnd = 17;
  private weekWorkHours = 40;
  private dayWorkHours = 8;

  constructor() {
  }

  public calculateDueDateTime(submitDate: Date, turnAround: number): Date {
    if (turnAround <= 0) {
      throw new Error(this.ERROR_SUBMITTING_NEGATIVE_NULL_TURNAROUND);
    }
    if (this.nonWorkingDays.includes(submitDate.getDay())) {
      throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS);
    }
    if (submitDate.getHours() < this.WorkHoursStart || submitDate.getHours() >= this.WorkHoursEnd) {
      throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS);
    }
    let dueDate = new Date(submitDate);
    let remainingWorkHours = turnAround;

    const fullWeeks = Math.floor(turnAround / this.weekWorkHours);
    remainingWorkHours = turnAround % this.weekWorkHours;
    dueDate.setDate(dueDate.getDate() + 7*fullWeeks);

    const fullDays = Math.floor(remainingWorkHours / this.dayWorkHours);
    remainingWorkHours = remainingWorkHours % this.dayWorkHours;
    dueDate.setDate(dueDate.getDate() + 1*fullDays);
    dueDate.setHours(dueDate.getHours() + remainingWorkHours);

    if (dueDate.getHours() >= 17) {
      dueDate.setHours(dueDate.getHours() + 16);
    }
    if (dueDate.getDay() == 6 || (dueDate.getDay() < submitDate.getDay()) || ((dueDate.getDay() == submitDate.getDay()) && (dueDate.getHours() < submitDate.getHours()))) {
      dueDate.setDate(dueDate.getDate() + 2);
    }
    return dueDate;
  }

}
