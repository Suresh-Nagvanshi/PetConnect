import React, { useState, useEffect } from 'react';

function ShowFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [userType, setUserType] = useState('');

  // Get user type from localStorage
  useEffect(() => {
    const buyer = localStorage.getItem('buyer');
    const seller = localStorage.getItem('seller');
    const vet = localStorage.getItem('vet');
    if (buyer) setUserType('Buyer');
    else if (seller) setUserType('Seller');
    else if (vet) setUserType('Veterinarian');
  }, []);

  // Fetch feedbacks from your API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/feedbacks');
        if (!response.ok) throw new Error('Failed to fetch feedbacks');
        const data = await response.json();
        setFeedbacks(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to load feedbacks');
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  // Filter feedbacks based on rating
  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'all') return true;
    return feedback.rating?.toString() === filter;
  });

  // Calculate statistics
  const totalFeedbacks = feedbacks.length;
  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : 0;
  const fiveStarCount = feedbacks.filter(f => f.rating === 5).length;
  const fourStarCount = feedbacks.filter(f => f.rating === 4).length;

  // Star rating component
  const StarRating = ({ rating }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? '#FFD700' : '#E5E7EB'}
          className="w-4 h-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.234 3.793a1 1 0 00.95.69h3.993c.969 0 1.371 1.24.588 1.81l-3.232 2.345a1 1 0 00-.364 1.118l1.234 3.793c.3.922-.755 1.688-1.54 1.118l-3.232-2.345a1 1 0 00-1.175 0l-3.232 2.345c-.784.57-1.838-.196-1.539-1.118l1.233-3.793a1 1 0 00-.364-1.118L2.275 9.22c-.783-.57-.38-1.81.588-1.81h3.993a1 1 0 00.95-.69l1.234-3.793z" />
        </svg>
      ))}
    </div>
  );

  // Badge color for feedback type
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'adoption': return 'bg-green-100 text-green-800';
      case 'veterinary': return 'bg-blue-100 text-blue-800';
      case 'products': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Received Feedbacks</h1>
              <p className="text-gray-600 mt-1">View feedbacks given by our users</p>
            </div>
            <div className="flex items-center space-x-6 sm:space-x-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{averageRating}</p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{totalFeedbacks}</p>
                <p className="text-sm text-gray-500">Total Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.234 3.793a1 1 0 00.95.69h3.993c.969 0 1.371 1.24.588 1.81l-3.232 2.345a1 1 0 00-.364 1.118l1.234 3.793c.3.922-.755 1.688-1.54 1.118l-3.232-2.345a1 1 0 00-1.175 0l-3.232 2.345c-.784.57-1.838-.196-1.539-1.118l1.233-3.793a1 1 0 00-.364-1.118L2.275 9.22c-.783-.57-.38-1.81.588-1.81h3.993a1 1 0 00.95-.69l1.234-3.793z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">5-Star Reviews</p>
                <p className="text-2xl font-semibold text-gray-900">{fiveStarCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.234 3.793a1 1 0 00.95.69h3.993c.969 0 1.371 1.24.588 1.81l-3.232 2.345a1 1 0 00-.364 1.118l1.234 3.793c.3.922-.755 1.688-1.54 1.118l-3.232-2.345a1 1 0 00-1.175 0l-3.232 2.345c-.784.57-1.838-.196-1.539-1.118l1.233-3.793a1 1 0 00-.364-1.118L2.275 9.22c-.783-.57-.38-1.81.588-1.81h3.993a1 1 0 00.95-.69l1.234-3.793z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">4-Star Reviews</p>
                <p className="text-2xl font-semibold text-gray-900">{fourStarCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                <p className="text-2xl font-semibold text-gray-900">{totalFeedbacks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Filter Reviews</h2>
            
            <div className="flex flex-wrap gap-2">
              {['all', '5', '4', '3', '2', '1'].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilter(rating)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    filter === rating
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating === 'all' ? 'All' : `${rating} Star${rating !== '1' ? 's' : ''}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedbacks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedbacks found</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? "You haven't received any feedbacks yet." 
                  : `No ${filter}-star feedbacks found.`
                }
              </p>
            </div>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <div key={feedback._id || feedback.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {feedback.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{feedback.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{feedback.email}</p>
                    </div>
                  </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <StarRating rating={feedback.rating} />
                        <span className="text-sm font-medium text-gray-700">
                          {feedback.rating}/5
                        </span>
                      </div>
                    </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700">{feedback.feedback}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowFeedback;
