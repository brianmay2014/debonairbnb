const checkin = new Date();
const daysToAdd = 8;
const checkout = new Date(checkin.getTime() + (daysToAdd*24*60*60*1000));



const getCheckinDate = () => {
    let year = checkin.getFullYear();
    let month = checkin.getMonth() + 1;
    let day = checkin.getDate();
    
    if (month < 10) {
        month = `0${month.toString()}`;
    }
    if (day < 10) {
        day = `0${day.toString()}`;
    }

    return `${year}-${month.toString()}-${day.toString()}`;
}

const getCheckoutDate = () => {
    let coYear = checkout.getFullYear();
    let coMonth = checkout.getMonth() + 1;
    let coDay = checkout.getDate();
    
    if (coMonth < 10) {
        coMonth = `0${coMonth.toString()}`;
    }
    if (coDay < 10) {
        coDay = `0${coDay.toString()}`;
    }

    return `${coYear}-${coMonth.toString()}-${coDay.toString()}`;
}

const getNightStay = () => {
    let diffTime = Math.abs(checkout - checkin);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
        diffDays = 0;
    }

    return diffDays;
};

module.exports = {getCheckinDate, getCheckoutDate, getNightStay} 