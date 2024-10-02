export class DueDateCalculator {

  readonly ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS = 'Please report your issue between Monday and Friday';
  readonly ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS = 'Please report your issue between 9AM and 5PM';
  private nonWorkingDays = [0,6];
  private workingHoursStart = 9;
  private workingHoursEnd = 17;

  constructor() {
  }

  public calculateDueDateTime(submitDate: Date, turnAround: number): Date {
    if (this.nonWorkingDays.includes(submitDate.getDay())) {
      throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS);
    }
    if (submitDate.getHours() < this.workingHoursStart || submitDate.getHours() >= this.workingHoursEnd) {
      throw new Error(this.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS);
    }
    let dueDate = submitDate;
    // dueDate = add turnAround hours to submitDate
    // if dueDate is past 5pm, add 16 hours
    return dueDate;
  }

}
