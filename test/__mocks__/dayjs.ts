export const dayjs = (): {
    unix: () => number;
    toISOString: () => string;
    isValid: () => boolean
} => ({
    unix: jest.fn(() => 11),
    toISOString: jest.fn(() => 'Iso'),
    isValid: jest.fn(() => true),
});
