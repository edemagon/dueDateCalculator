import {beforeEach, describe, expect, test} from '@jest/globals';
import {DueDateCalculator} from '../src/main';

describe('DueDateCalculator', () => {
  let dueDateCalculator: DueDateCalculator;

  beforeEach(() => {
    dueDateCalculator = new DueDateCalculator();
  })

  test('should return an error if submit date is outside working days', () => {
    let submitDateSaturday = new Date(2024, 10, 9, 11, 12);
    expect(dueDateCalculator.calculateDueDateTime(submitDateSaturday, 4)).toThrow(dueDateCalculator.ERROR_SUBMITTING_OUTSIDE_WORKING_DAYS);
  });

  test('should return an error if submit date is outside working hours', () => {
    let submitDateThursday = new Date(2024, 9, 24, 7, 30);
    expect(dueDateCalculator.calculateDueDateTime(submitDateThursday, 5)).toThrow(dueDateCalculator.ERROR_SUBMITTING_OUTSIDE_WORKING_HOURS);
  });

  test('should not consider holidays as non working days', () => {
    let submitDateWednesday = new Date(2024, 11, 25, 13, 30);
    let dueDateThursday = new Date(2024, 11, 26, 12, 30);
    expect(dueDateCalculator.calculateDueDateTime(submitDateWednesday, 7)).toBe(dueDateThursday);
  });

  test('should calculate due date considering working hours', () => {
    let submitDateTuesday = new Date(2024, 9, 8, 11, 12);
    let dueDateThursday = new Date(2024, 9, 10, 11, 12);
    expect(dueDateCalculator.calculateDueDateTime(submitDateTuesday, 16)).toBe(dueDateThursday);
  });

  test('should be able to return a due time within the same day', () => {
    let submitDateTuesday = new Date(2024, 9, 8, 11, 12);
    let dueDateTuesday = new Date(2024, 9, 8, 14, 12);
    expect(dueDateCalculator.calculateDueDateTime(submitDateTuesday, 3)).toBe(dueDateTuesday);
  });

  test('should calculate due date considering working hours and non working days', () => {
    let submitDateFriday = new Date(2024, 9, 11, 11, 12);
    let dueDateTuesday = new Date(2024, 9, 15, 11, 12);
    expect(dueDateCalculator.calculateDueDateTime(submitDateFriday, 16)).toBe(dueDateTuesday);
  });

  test('should calculate due date with turnaround time longer than a week', () => {
    let submitDateMonday = new Date(2024, 9, 21, 11, 20);
    let dueDateFridayNextWeek = new Date(2024, 10, 1, 12, 20);
    expect(dueDateCalculator.calculateDueDateTime(submitDateMonday, 73)).toBe(dueDateFridayNextWeek);
  });
})
