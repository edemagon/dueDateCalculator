export class DueDateCalculator {

  readonly ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS = 'Please report your issue between Monday and Friday';
  readonly ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS = 'Please report your issue between 9AM and 5PM';
  readonly ERROR_SUBMITTING_NEGATIVE_NULL_TURNAROUND = 'Please use a positive turnaround time';
  private nonWorkingDays = [0,6];
  private workingHoursStart = 9;
  private workingHoursEnd = 17;

  constructor() {
  }

  public calculateDueDateTime(submitDate: Date, turnAround: number): Date {
    if (turnAround <= 0) {
      throw new Error(this.ERROR_SUBMITTING_NEGATIVE_NULL_TURNAROUND);
    }
    if (this.nonWorkingDays.includes(submitDate.getDay())) {
      throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS);
    }
    if (submitDate.getHours() < this.workingHoursStart || submitDate.getHours() >= this.workingHoursEnd) {
      throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS);
    }
    let dueDate = submitDate;
    if (turnAround >= 8) {
      const fullDays = Math.floor(turnAround / 8);
      const remaining = turnAround % 8;
      // add full days every 8 hours
      dueDate.setHours(dueDate.getHours() + 24*fullDays);
      // add remaining hours
      dueDate.setHours(dueDate.getHours() + remaining);
    }
    if (turnAround < 8) {
      dueDate.setHours(dueDate.getHours() + turnAround);
    }
    // go to next day if time has passed 17
    if (dueDate.getHours() >= 17) {
      dueDate.setHours(dueDate.getHours() + 16);
    }
    return dueDate;
  }

}
