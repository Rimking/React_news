import React from 'react'
import "./imageBox.css"
import imagesF from "../../imgs/1.png"

export default function imageBox() {
  return (
    <div className='yelBox'>
        <img src={imagesF} alt="" />
    </div>
  )
}
