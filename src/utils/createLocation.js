function createLocation(data) {
    data.location = data.location.split(' ');
    const point = { type: "Point", coordinates: data.location }
    data.location = point;
    return data;
}

module.exports = createLocation;