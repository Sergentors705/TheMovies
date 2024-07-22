import React from 'react'

export default function ArraySeparator(array1, array2, array3) {
  const TimelessArray1 = array1;
  const TimelessArray2 = array2;

  array1.forEach(item => {
    array2.forEach(element => {
      if (element.id === item.id) {
        array3.push(item);
        TimelessArray1.splice(TimelessArray1.indexOf(item),1);
        TimelessArray2.splice(TimelessArray2.indexOf(element),1);
      }
    })
  })
  array1 = TimelessArray1;
  array2 = TimelessArray2;
}
