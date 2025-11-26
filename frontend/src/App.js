import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Header from './common/Header/Header';
import BlogSearch from './pages/BlogSearch/BlogSearch';//KV: added Blog Search page
import BlogPost from './pages/BlogPost/BlogPost';//KV: added blog post page
import Phase3step1 from './pages/Phase3step1/Phase3step1';//KV: added phase 3 step 1 page
import Phase3step2 from './pages/Phase3step2/Phase3step2';//KV: added phase 3 step 2 page
{/*import Phase3step3 from './pages/Phase3step3/Phase3step3';//KV: added phase 3 step 3 page*/}

export default function App(){
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/blog/post" element={<BlogPost />} /> {/*KV: add route to blog post*/}
        <Route path="/blog/search" element={<BlogSearch />} /> {/*KV: add route to blog search*/}
        <Route path="/blog/phase3step1" element={<Phase3step1 />} /> {/*KV: add route to Phase 3 step 1*/}
        <Route path="/blog/phase3step2" element={<Phase3step2 />} /> {/*KV: add route to Phase 3 step 2*/}
        {/*<Route path="/blog/phase3step3" element={<Phase3step3 />} /> {/*KV: add route to Phase 3 step 3*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
