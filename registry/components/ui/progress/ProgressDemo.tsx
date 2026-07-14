"use client";
import React, { useEffect, useState } from 'react'
import { Progress } from './Progress';

export const ProgressDemo = () => {
    const[Field,setField] =useState(13);
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setField(66);
        } ,500);
        return()=>clearTimeout(timer);
    },[]);
  return (
    <Progress
    value={Field}
    
    />
  );
}
