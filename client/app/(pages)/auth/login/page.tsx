"use client";

import React, { useState } from 'react'
import SchoolCodePage from './school-code';
import Login from './login';
import { SchoolPreview } from '@/app/models/school.model';

const Auth = () => {
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [schoolData, setSchoolData] = useState<SchoolPreview | null>(null);
  return (
    showLogin ? <Login schoolData={schoolData}/> : <SchoolCodePage schoolData={schoolData} setSchoolData={setSchoolData} setShowLogin={setShowLogin}/>
  )
}

export default Auth