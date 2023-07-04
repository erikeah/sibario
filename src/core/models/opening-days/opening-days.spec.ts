import { OpeningDays } from './opening-days';

describe('OpeningDays', () => {
    it('should be defined', () => {
        expect(new OpeningDays({
            monday: [],
            friday: [],
            sunday: [],
            tuesday: [],
            saturday: [],
            thursday: [],
            wednesday: [],
        })).toBeDefined();
    });
});
