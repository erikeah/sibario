import { OpeningHours } from './opening-hours';

describe('OpeningHours', () => {
    it('should be defined', () => {
        expect(new OpeningHours({ open: '00:15', close: '00:30' })).toBeDefined();
    });
});
