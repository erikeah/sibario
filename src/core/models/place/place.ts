export class Place {
    id: string;

    name: string;

    constructor(id: string, name: string) {
        Object.assign(this, {
            id,
            name,
        });
    }
}
