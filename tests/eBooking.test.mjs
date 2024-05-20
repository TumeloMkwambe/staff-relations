import { submitHandler, checkBookingLimit, getWeekStartDate, getWeekEndDate, fetchBookings } from '../views/employee/eBooking';
import { push, ref, onValue, remove } from 'firebase/database';
import { JSDOM } from 'jsdom';

// Create a JSDOM environment to mock the DOM
const dom = new JSDOM(`<!DOCTYPE html><html><body><form id="bookingForm"></form></body></html>`);
global.document = dom.window.document;
global.window = dom.window;
global.navigator = { userAgent: 'node.js' };

// Mock firebase/database module
jest.mock('firebase/database');

describe('submitHandler', () => {
  it('should handle form submission and reset the form', async () => {
    const mockEvent = { preventDefault: jest.fn() };

    document.getElementById.mockReturnValueOnce({ value: 'John Doe' }) // Mock name
      .mockReturnValueOnce({ value: 'john@example.com' }) // Mock email
      .mockReturnValueOnce({ value: '2024-05-20' }); // Mock date

    document.getElementById('bookingForm').reset = jest.fn();

    await submitHandler(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(push).toHaveBeenCalled();
    expect(document.getElementById('bookingForm').reset).toHaveBeenCalled();
  });
});

describe('checkBookingLimit', () => {
  it('should call the callback with true if the booking limit is not reached', () => {
    const mockSnapshot = {
      val: () => ({
        booking1: { date: '2024-05-15' },
        booking2: { date: '2024-05-18' }
      })
    };

    onValue.mockImplementation((query, callback) => {
      callback(mockSnapshot);
    });

    const callback = jest.fn();

    checkBookingLimit('john@example.com', '2024-05-20', callback);

    expect(onValue).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should call the callback with false if the booking limit is reached', () => {
    const mockSnapshot = {
      val: () => ({
        booking1: { date: '2024-05-15' },
        booking2: { date: '2024-05-17' },
        booking3: { date: '2024-05-19' }
      })
    };

    onValue.mockImplementation((query, callback) => {
      callback(mockSnapshot);
    });

    const callback = jest.fn();

    checkBookingLimit('john@example.com', '2024-05-20', callback);

    expect(onValue).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(false);
  });
});

describe('getWeekStartDate', () => {
  it('should return the correct week start date', () => {
    expect(getWeekStartDate('2024-05-20')).toBe('2024-05-20');
  });
});

describe('getWeekEndDate', () => {
  it('should return the correct week end date', () => {
    expect(getWeekEndDate('2024-05-20')).toBe('2024-05-26');
  });
});
