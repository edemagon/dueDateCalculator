import {beforeEach, describe, expect, test} from '@jest/globals';
import {DueDateCalculator} from '../src/main';

describe('DueDateCalculator', () => {
  let dueDateCalculator: DueDateCalculator;

  beforeEach(() => {
    dueDateCalculator = new DueDateCalculator();
  })

  test('should return an error if turnAround time is negative', () => {
    let submitDateTuesday = new Date(2024, 9, 8, 11, 12);
    expect(() => {
      dueDateCalculator.calculateDueDateTime(submitDateTuesday, -4);
    }).toThrow(dueDateCalculator.ERROR_SUBMITTING_NEGATIVE_NULL_TURNAROUND);
  });

  test('should return an error if turnAround time is null', () => {
    let submitDateTuesday = new Date(2024, 9, 8, 11, 12);
    expect(() => {
      dueDateCalculator.calculateDueDateTime(submitDateTuesday, 0);
    }).toThrow(dueDateCalculator.ERROR_SUBMITTING_NEGATIVE_NULL_TURNAROUND);
  });

  test('should return an error if submit date is outside working days', () => {
    let submitDateSaturday = new Date(2024, 10, 9, 11, 12);
    expect(() => {
      dueDateCalculator.calculateDueDateTime(submitDateSaturday, 4);
    }).toThrow(dueDateCalculator.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS);
  });

  test('should return an error if submit date is outside working hours', () => {
    let submitDateThursday = new Date(2024, 9, 24, 7, 30);
    expect(() => {
      dueDateCalculator.calculateDueDateTime(submitDateThursday, 5);
    }).toThrow(dueDateCalculator.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS);
  });

  test('should return an error if submit date 5pm', () => {
    let submitDateThursday = new Date(2024, 9, 24, 17, 0);
    expect(() => {
      dueDateCalculator.calculateDueDateTime(submitDateThursday, 5);
    }).toThrow(dueDateCalculator.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS);
  });

  test('should return a due date if submit date is 9am', () => {
    let submitDateThursday = new Date(2024, 9, 24, 9, 0);
    let dueDateThursday = new Date(2024, 9, 24, 11, 0);
    expect(dueDateCalculator.calculateDueDateTime(submitDateThursday, 2).getTime()).toBe(dueDateThursday.getTime());
  });

  test('should not consider holidays as non working days', () => {
    let submitDateWednesday = new Date(2024, 11, 25, 13, 30);
    let dueDateThursday = new Date(2024, 11, 26, 12, 30);
    expect(dueDateCalculator.calculateDueDateTime(submitDateWednesday, 7).getTime()).toBe(dueDateThursday.getTime());
  });

  test('should calculate due date considering working hours - turnaround below 8', () => {
    let submitDateTuesday = new Date(2024, 9, 8, 14, 40);
    let dueDateThursday = new Date(2024, 9, 9, 13, 40);
    expect(dueDateCalculator.calculateDueDateTime(submitDateTuesday, 7).getTime()).toBe(dueDateThursday.getTime());
  });

  test('should calculate due date considering working hours - turnaround higher than 8', () => {
    let submitDateTuesday = new Date(2024, 9, 8, 11, 12);
    let dueDateThursday = new Date(2024, 9, 10, 11, 12);
    expect(dueDateCalculator.calculateDueDateTime(submitDateTuesday, 16).getTime()).toBe(dueDateThursday.getTime());
  });

  test('should be able to return a due time within the same day', () => {
    let submitDateTuesday = new Date(2024, 9, 8, 11, 12);
    let dueDateTuesday = new Date(2024, 9, 8, 14, 12);
    expect(dueDateCalculator.calculateDueDateTime(submitDateTuesday, 3).getTime()).toBe(dueDateTuesday.getTime());
  });

  test('should calculate due date considering working hours and non working days - turnaround bellow 8', () => {
    let submitDateFriday = new Date(2024, 9, 11, 11, 12);
    let dueDateTuesday = new Date(2024, 9, 15, 11, 12);
    expect(dueDateCalculator.calculateDueDateTime(submitDateFriday, 16).getTime()).toBe(dueDateTuesday.getTime());
  });

  test('should calculate due date considering working hours and non working days - turnaround higher than 8', () => {
    let submitDateFriday = new Date(2024, 9, 11, 16, 30);
    let dueDateMonday = new Date(2024, 9, 14, 11, 30);
    expect(dueDateCalculator.calculateDueDateTime(submitDateFriday, 3).getTime()).toBe(dueDateMonday.getTime());
  });

  test('should calculate due date with turnaround time longer than a week', () => {
    let submitDateMonday = new Date(2024, 9, 21, 11, 20);
    let dueDateFridayNextWeek = new Date(2024, 10, 1, 12, 20);
    expect(dueDateCalculator.calculateDueDateTime(submitDateMonday, 73).getTime()).toBe(dueDateFridayNextWeek.getTime());
  });
})
