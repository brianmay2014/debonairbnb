const checkin = new Date();
const daysToAdd = 8;
const checkout = new Date(checkin.getTime() + (daysToAdd*24*60*60*1000));

// const dateParser = (dateobj) => {
// 	let year = dateobj.getFullYear();
// 	let month = dateobj.getMonth() + 1;
// 	let day = dateobj.getDate();

// 	if (month < 10) {
// 		month = `0${month.toString()}`;
// 	}
// 	if (day < 10) {
// 		day = `0${day.toString()}`;
// 	}

// 	return `${year}-${month.toString()}-${day.toString()}`;
// };

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

const getNightStay = (checkin, checkout) => {
    // console.log(checkin);
    // console.log(typeof checkin)
    
    let dateIn = new Date(checkin);
    // console.log('in', dateIn);
    let dateOut = new Date(checkout);
    // console.log('out', dateOut);

    let diffTime = Math.abs(dateOut - dateIn);
    // console.log('diffTime', diffTime);
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // console.log('diffDays', diffDays);
    if (diffDays < 1) {
        diffDays = 0;
    }

    return diffDays;
};

module.exports = {getCheckinDate, getCheckoutDate, getNightStay} 
