import React from 'react';

export default function ArraySeparator(array1, array2, array3) {
  // const TimelessArray1 = [...array1];
  // const TimelessArray2 = [...array2];

  // for (let i = 0; i < array1.length; i++ ) {
  //   for (let k = 0; k < array2.length; k++ ) {
  //     if (TimelessArray1[i].id === TimelessArray2[k].id) {
  //       array3.push(TimelessArray1[i]);
  //       TimelessArray1.splice(TimelessArray1.indexOf(TimelessArray1[i]), 1)
  //     }
  //   }
  // }

  // array1 = [...TimelessArray1];
  // array2 = [...TimelessArray2];
  const pidor = {id: 1, name: 'One'};
  const test = [{id: 1, name: 'One'}, {id: 2, name: 'two'}]
  const arr = [{id: 1, name: 'One'}, {id: 2, name: 'two'}]
  const hui = ['a', 'b', 'c', 'd', 'e', {id: 3}]
  console.log(hui.includes('d'))
}
