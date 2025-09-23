import React from 'react';
import FeedbackForm from './FeedbackForm';

function Feedback() {
  return (
    <FeedbackForm 
      title="Feedback"
      subtitle="Tell us what you think. Your voice helps us improve."
      showTestimonials={true}
      apiEndpoint="/api/feedback"
    />
  );
}

export default Feedback;

