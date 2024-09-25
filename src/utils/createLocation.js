function createLocation(atribute) {
    atribute = atribute.split(' ');
    const point = { type: "Point", coordinates: atribute }
    atribute = point;
    return atribute;
}

module.exports = createLocation;