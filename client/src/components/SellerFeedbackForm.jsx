import React from 'react';
import FeedbackForm from './FeedbackForm';

function SellerFeedbackForm() {
  const sellerTestimonials = [
    {
      text: "PetConnect helped me find loving homes for all my rescue animals.",
      author: "Sarah M."
    },
    {
      text: "The platform made it easy to showcase my pets and connect with buyers.",
      author: "Mike R."
    },
    {
      text: "Great community support and helpful resources for pet sellers.",
      author: "Lisa T."
    }
  ];

  const handleSubmit = async (formData) => {
    // Add seller-specific logic here if needed
    const response = await fetch('/api/seller-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        userType: 'seller',
        userId: JSON.parse(localStorage.getItem('seller'))?.id
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to submit feedback');
    }
  };

  return (
    <FeedbackForm 
      title="Share Your Selling Experience"
      subtitle="Help us improve the platform for pet and product sellers"
      testimonials={sellerTestimonials}
      showTestimonials={true}
      onSubmit={handleSubmit}
      backgroundImage="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1600"
    />
  );
}

export default SellerFeedbackForm;
