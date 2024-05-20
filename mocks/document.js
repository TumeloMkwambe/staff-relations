const mockElement = {
  value: "",
  addEventListener: jest.fn(),
  reset: jest.fn()
};

export default {
  getElementById: jest.fn((id) => mockElement),
  querySelector: jest.fn(() => ({
    innerHTML: '',
    insertRow: jest.fn(() => ({
      innerHTML: ''
    }))
  }))
};
