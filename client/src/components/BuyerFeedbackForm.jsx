import React from 'react';
import FeedbackForm from './FeedbackForm';

function BuyerFeedbackForm() {
  const buyerTestimonials = [
    {
      text: "Adopting through PetConnect was so smooth. Our family is complete!",
      author: "Priya S."
    },
    {
      text: "Great support and amazing shelters partnered on the platform.",
      author: "Aarav K."
    },
    {
      text: "Found my best friend here. Interface is clean and easy.",
      author: "Meera R."
    }
  ];

  const handleSubmit = async (formData) => {
    // Add buyer-specific logic here if needed
    const response = await fetch('/api/buyer-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        userType: 'buyer',
        userId: JSON.parse(localStorage.getItem('buyer'))?.id
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to submit feedback');
    }
  };

  return (
    <FeedbackForm 
      title="Share Your Experience"
      subtitle="Help other buyers by sharing your adoption experience"
      testimonials={buyerTestimonials}
      showTestimonials={true}
      onSubmit={handleSubmit}
      backgroundImage="https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg?auto=compress&cs=tinysrgb&w=1600"
    />
  );
}

export default BuyerFeedbackForm;
