import React, { useState } from "react";
import DateComboBox from "~/frontend/src/components/DateComboBox";
import { getDate } from "~/frontend/src/utils";

export default function TeamWorkhourBoard () {
  const [date, setDate] = useState(getDate());
  return (
    <div>
      <DateComboBox date={date} setDate={setDate} />
    </div>
  );
}
