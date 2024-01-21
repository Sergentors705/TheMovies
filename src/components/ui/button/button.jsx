import React from 'react';

export default function PrimaryButton({text, type, classname, onclick}) {
  return (
    <button className={`button-primary ${classname}`} type={type} onClick={onclick}>
      {text}
    </button>
  )
}
