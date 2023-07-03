export class Place {
    id: string;

    name: string;

    constructor(object: Partial<Place>) {
        this.id = object.id;
        this.name = object.name;
    }
}
