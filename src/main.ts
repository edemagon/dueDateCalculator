export class DueDateCalculator {

  readonly ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS = 'Please report your issue between 9AM and 5PM';
  readonly ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS = 'Please report your issue between Monday and Friday';

  constructor() {
  }

  public calculateDueDateTime(submitDate: Date, turnAround: number): Date {
    return new Date();
  }
}
