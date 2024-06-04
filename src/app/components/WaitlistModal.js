"use client";

import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";
import '../styles/waitlist.css';
import Image from "next/image";
import Xbutton from '../assets/x-button.jpg';

function WaitlistModal({ toggleModal }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        businessName: '',
        website: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        setFadeOut(true);
        setTimeout(() => {
            setFadeOut(false);
            toggleModal();
        }, 500); // 500ms should match your animation duration
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = {
            ...formData,
            timestamp: Date.now() // Adds the current date and time as the timestamp
        };

        await addDoc(collection(db, "waitlist"), newEntry);
        setFormData({
            email: '',
            name: '',
            businessName: '',
            website: ''
        });
        setIsSubmitted(true);  // Set isSubmitted to true after successful submission
        setTimeout(handleClose, 1500); // Wait for 1500ms (1.5 seconds) then call handleClose
    };

    return (
        <div className={`waitlist-container ${fadeOut ? 'fade-out' : ''}`}>
            <div className='waitlist-background'>
                <div className='waitlist-content'>
                    <img className="waitlist-modal-close" onClick={handleClose} src="https://firebasestorage.googleapis.com/v0/b/medallion-3f305.appspot.com/o/campaign_images%2Fx-button.jpg?alt=media&token=d7934e4b-769e-4028-99ec-94cfddc0164e" alt="Close" />
                    <div className="waitlist-header">
                        <div className='waitlist-header-content'>
                            {isSubmitted ? (
                                <>
                                    <p className='waitlist-success'>Thank you for joining the waitlist!</p>
                                    <p className='waitlist-success'>We'll be in touch soon.</p>
                                </>
                            ) : (
                                <>
                                    <h1>Join the Waitlist</h1>
                                    <p>Thanks for your interest! By submitting this form, your company will join our waitlist to get early access. When your company has been selected, we will reach out to set up a demo.</p>
                                    <form className="waitlist-form" onSubmit={handleSubmit}>
                                        <div className="input-container">
                                            <label htmlFor="name" className="input-label">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className='input-field'
                                                name="name"
                                                placeholder="Enter your Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="email" className="input-label">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className='input-field'
                                                name="email"
                                                placeholder="Enter your Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="businessName" className="input-label">Business Name</label>
                                            <input
                                                type="text"
                                                id="businessName"
                                                className='input-field'
                                                name="businessName"
                                                placeholder="Enter your Business Name"
                                                value={formData.businessName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="website" className="input-label">Website</label>
                                            <input
                                                type="text"
                                                id="website"
                                                className='input-field'
                                                name="website"
                                                placeholder="Enter your Business Website"
                                                value={formData.website}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className='waitlist-form-button margin-top-medium full-width'>Join Waitlist</button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaitlistModal;
