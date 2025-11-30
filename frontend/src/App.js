import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Header from './common/Header/Header';
import BlogSearch from './pages/BlogSearch/BlogSearch';//KV: added Blog Search page
import BlogPost from './pages/BlogPost/BlogPost';//KV: added blog post page
import FollowOthers from './pages/FollowOthers/FollowOthers';//KV: added interface to follow others
import Phase3step1 from './pages/Phase3/Phase3step1';//KV: added phase 3 step 1 page
import Phase3step2 from './pages/Phase3/Phase3step2';//KV: added phase 3 step 2 page
import Phase3step3 from './pages/Phase3/Phase3step3';//KV: added phase 3 step 3 page
import Phase3step4 from './pages/Phase3/Phase3step4';//KV: added phase 3 step 4 page
import Phase3step5 from './pages/Phase3/Phase3step5';//KV: added phase 3 step 5 page
import Phase3step6 from './pages/Phase3/Phase3step6';//KV: added phase 3 step 6 page
import Phase3step7 from './pages/Phase3/Phase3step7';//KV: added phase 3 step 7 page

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
        <Route path="/followOthers" element={<FollowOthers />} /> {/*KV: add route to follow others*/}
        <Route path="/phase3step1" element={<Phase3step1 />} /> {/*KV: add route to Phase 3 step 1*/}
        <Route path="/phase3step2" element={<Phase3step2 />} /> {/*KV: add route to Phase 3 step 2*/}
        <Route path="/phase3step3" element={<Phase3step3 />} /> {/*KV: add route to Phase 3 step 3*/}
        <Route path="/phase3step4" element={<Phase3step4 />} /> {/*KV: add route to Phase 3 step 4*/}
        <Route path="/phase3step5" element={<Phase3step5 />} /> {/*KV: add route to Phase 3 step 5*/}
        <Route path="/phase3step6" element={<Phase3step6 />} /> {/*KV: add route to Phase 3 step 6*/}
        <Route path="/phase3step7" element={<Phase3step7 />} /> {/*KV: add route to Phase 3 step 7*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
