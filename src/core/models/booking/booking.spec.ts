import { dayjs } from 'test/__mocks__/dayjs';
import { Booking } from './booking';

jest.mock('dayjs', () => dayjs);

describe('Booking', () => {
    it('should be defined', () => {
        expect(
            new Booking({
                id: '',
                date: dayjs().toISOString(),
                seats: 20,
                client: '',
            }),
        ).toBeDefined();
    });
});
