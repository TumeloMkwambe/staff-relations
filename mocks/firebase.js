export const initializeApp = jest.fn();
export const getDatabase = jest.fn();
export const ref = jest.fn();
export const push = jest.fn(() => Promise.resolve());
export const onValue = jest.fn();
export const remove = jest.fn(() => Promise.resolve());
export const query = jest.fn();
export const orderByChild = jest.fn();
export const equalTo = jest.fn();
