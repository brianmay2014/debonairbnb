import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";

const SearchDurationInput = () => {


  return (
    <div>
      <input type='date' placeholder='check-in'/>
      <input type='date' placeholder='check-out'/>
    </div>
  );
};

export default SearchDurationInput;
