'use client';
import React from 'react'
import { toast } from 'react-toastify'

const ToastError = ({message} : {message : string}) => {

  toast.error(message);
  return (
    <></>
  )
}

export default ToastError