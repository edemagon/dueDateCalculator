import {beforeEach, describe, expect, test} from '@jest/globals';
import {DueDateCalculator} from '../src/main';

describe('DueDateCalculator', () => {
  let dueDateCalculator: DueDateCalculator;

  beforeEach(() => {
    dueDateCalculator = new DueDateCalculator();
  })

  test('should start with a total of 0', () => {
    // new Date(year, monthIndex, day, hours, minutes)
    let submitDate = new Date(2024, 9, 8, 11, 12);
    let dueDate = new Date(2024, 9, 10, 11, 12);
    expect(dueDateCalculator.calculateDueDateTime(submitDate, 16)).toBe(dueDate);
  });
})
