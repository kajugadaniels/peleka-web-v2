import React from 'react'
import { AddDeliveryRequest, GetDeliveryRequestDetails, GetDeliveryRequests, Home, Login, Contact, OurProduct, Register, WhoWeAre } from './pages'
import UserLayout from './layouts/UserLayout'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/who-we-are" element={<WhoWeAre />} />
                <Route path="/our-product" element={<OurProduct />} />
                <Route path="/contact-us" element={<Contact />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/delivery-requests" element={<GetDeliveryRequests />} />
                <Route path="/delivery-request/:id" element={<GetDeliveryRequestDetails />} />
                <Route path="/delivery-request/add" element={<AddDeliveryRequest />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes