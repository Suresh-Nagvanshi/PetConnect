import React from 'react';
import FeedbackForm from './FeedbackForm';

function VetFeedbackForm() {
  const vetTestimonials = [
    {
      text: "PetConnect helped me reach more pet owners in need of veterinary care.",
      author: "Dr. Sarah Johnson"
    },
    {
      text: "The platform made it easy to schedule appointments and manage my services.",
      author: "Dr. Michael Chen"
    },
    {
      text: "Great way to build trust with pet owners through the platform.",
      author: "Dr. Emily Rodriguez"
    }
  ];

  const handleSubmit = async (formData) => {
    // Add vet-specific logic here if needed
    const response = await fetch('/api/vet-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        userType: 'veterinarian',
        userId: JSON.parse(localStorage.getItem('vet'))?.id
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to submit feedback');
    }
  };

  return (
    <FeedbackForm 
      title="Share Your Veterinary Experience"
      subtitle="Help us improve the platform for veterinary services"
      testimonials={vetTestimonials}
      showTestimonials={true}
      onSubmit={handleSubmit}
      backgroundImage="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1600"
    />
  );
}

export default VetFeedbackForm;
