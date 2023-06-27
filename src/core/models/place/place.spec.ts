import { Place } from './place';

describe('Place', () => {
    const place = new Place('', '');
    it('should be defined', () => {
        expect(place).toBeDefined();
    });

    it('should have a id prop', () => {
        expect(place.id).toBeDefined();
    });

    it('should have a name prop', () => {
        expect(place.name).toBeDefined();
    });
});
