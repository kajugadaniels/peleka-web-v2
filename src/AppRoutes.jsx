import React from 'react'
import { AddDeliveryRequest, GetDeliveryRequestDetails, GetDeliveryRequests, Home, Login, Contact, OurProduct, Register, WhoWeAre, Dashboard, Profile, Faqs, HelpCenter, TermsAndCondition, PrivacyPolicy } from './pages'
import UserLayout from './layouts/UserLayout'
import { Route, Routes } from 'react-router-dom'
import ProfileLayout from './layouts/ProfileLayout'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/who-we-are" element={<WhoWeAre />} />
                <Route path="/our-product" element={<OurProduct />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/terms-and-condition" element={<TermsAndCondition />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProfileLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/delivery-requests" element={<GetDeliveryRequests />} />
                <Route path="/delivery-request/:id" element={<GetDeliveryRequestDetails />} />
                <Route path="/delivery-request/add" element={<AddDeliveryRequest />} />

                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes