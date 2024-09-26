function discount(user, price) {
    let discount = 0;

    if(user.stratum === "1" || user.stratum === "2") discount += 0.10;
    if(user.stratum === "3" || user.stratum === "4") discount += 0.05;

    return price - (price * discount);
}

module.exports = discount;