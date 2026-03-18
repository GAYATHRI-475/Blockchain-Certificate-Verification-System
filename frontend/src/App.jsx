// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import HowItWorks from "./components/HowItWorks";
// import IssuerDashBoard from "./pages/IssuerDashBoard";
// import IssuerIssue from "./pages/IssuerIssue";
// import IssuerIssued from "./pages/IssuerIssued";
// import EditCertificate from "./pages/EditCertificate";
// import IssuerLayout from "./layouts/IssuerLayout";

// function App() {
//   return (
//     <Router>

//       <Routes>
//         {/* Home page route */}
//         <Route
//           path="/"
//           element={
//             <>
//               <Navbar />
//               <Hero />
//               <Features />
//               <HowItWorks />
//             </>
//           }
//         />

//         {/* Issuer Dashboard route */}
//         <Route element={<IssuerLayout />}>
//           <Route path="/dashboard" element={<IssuerDashBoard />} />
//           <Route path="/issue" element={<IssuerIssue />} />
//           <Route path="/issued" element={<IssuerIssued />} />
//           <Route path="/edit/:certId" element={<EditCertificate />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";

import IssuerDashBoard from "./pages/IssuerDashBoard";
import IssuerIssue from "./pages/IssuerIssue";
import IssuerIssued from "./pages/IssuerIssued";
import EditCertificate from "./pages/EditCertificate";
import IssuerRequests from "./pages/IssuerRequests";
import IssuerLayout from "./layouts/IssuerLayout";

import UserDashboard from "./pages/UserDashboard";
import UserRequest from "./pages/UserRequest";
import ViewCertificate from "./pages/ViewCertificate";
import UserLayout from "./layouts/UserLayout";
import ViewRequest from "./pages/ViewRequest";

import Verifier from "./pages/Verifier";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Features />
              <HowItWorks />
            </>
          }
        />

        {/* Issuer Dashboard route (unchanged) */}
        <Route element={<IssuerLayout />}>
          <Route path="/dashboard" element={<IssuerDashBoard />} />
          <Route path="/issue" element={<IssuerIssue />} />
          <Route path="/issued" element={<IssuerIssued />} />
          <Route path="/issuer-requests" element={<IssuerRequests />} />
          <Route path="/edit/:certId" element={<EditCertificate />} />
        </Route>

        {/* User Dashboard route */}
        <Route element={<UserLayout />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-requests" element={<UserRequest />} />
          <Route path="/certificate/:certId" element={<ViewCertificate />} />
          <Route path="/view-requests" element={<ViewRequest />} />
        </Route>

        {/* Verifier Page */}
        <Route path="/verify" element={<Verifier />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />

      </Routes>
    </Router>
  );
}

export default App;