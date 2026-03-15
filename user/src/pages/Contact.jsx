import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const accordionData = [
  {
    question: 'How to donate food?',
    answer: (
      <>
        <p>1) Click on <NavLink
          to="/foodDonationForm"
          className="text-red-600 text-base underline hover:text-red-400 transition-colors"
        >
          donate
        </NavLink>
          {' '}on the home page.</p>
        <p>2) Fill the details.</p>
        <p>3) Click on submit.</p>
        <img src="img/mobile.jpg" alt="mobile instruction" className="w-full bg-green-50 mt-2 rounded" />
      </>
    )
  },
  {
    question: 'How will my donation be used?',
    answer: (
      <p className="p-2 ">
        Your donation will be used to support our mission and the various programs and initiatives that we have in place. Your donation will help us to continue providing assistance and support to those in need. You can find more information about our programs and initiatives on our website. If you have any specific questions or concerns, please feel free to contact us.
      </p>
    )
  },
  {
    question: 'What should I do if my food donation is near or past its expiration date?',
    answer: (
      <p className="p-2 ">
        We appreciate your willingness to donate, but to ensure the safety of our clients we can't accept food that is near or past its expiration date. We recommend checking expiration dates before making a donation or contact us for further guidance.
      </p>
    )
  }
];

function Contact() {
  const [activeAccordions, setActiveAccordions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleAccordion = (index) => {
    setActiveAccordions((prev) =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });  // Clear form
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins">
      {/* Heading */}
      <div className="flex justify-center">
        <p className="text-4xl font-extrabold leading-tight pt-24 my-6 mb-10 border-b-4 border-b-green-600 pb-1 inline-block">
          Contact <span className='text-green-600'>Us</span>
        </p>
      </div>

      {/* Contact Form and Info */}
      <div className="max-w-4xl mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 space-y-4 rounded-2xl shadow-md text-gray-700 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold mb-1">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            name="send"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Send
          </button>

          {submitStatus && (
            <div className={`mt-4 ${submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {submitStatus === 'success' ? 'Feedback submitted successfully!' : 'Error submitting feedback. Please try again.'}
            </div>
          )}
        </form>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-gray-700 space-y-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <p className="text-xl font-semibold text-green-700 border-b pb-2">Get in Touch</p>

          <div className="flex items-center space-x-3">
            <i className="fas fa-envelope text-green-600"></i>
            <p><strong>Email:</strong> nourishnext@gmail.com</p>
          </div>

          <div className="flex items-center space-x-3">
            <i className="fas fa-phone text-green-600"></i>
            <p><strong>Phone:</strong> 987-774-3016</p>
          </div>

          <div className="flex items-center space-x-3">
            <i className="fas fa-map-marker-alt text-green-600"></i>
            <p><strong>Location:</strong> Chennai, Tamil Nadu</p>
          </div>

          <div className="pt-4 border-t-1 mt-5 border-green-700">
            <p className="text-sm mt-3 text-gray-600">
              We’d love to stay connected! Follow us on social media for updates, events, and stories from <span className="text-green-700 font-semibold">Feeding Futures</span>.
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-6 mt-10 justify-center gap-10 sm:space-y-0">
              <a href="https://www.facebook.com/">
                <img className='w-12 hover:scale-105 transition-all' src="img/facebook.png" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/">
                <img className='w-12 hover:scale-105 transition-all' src="img/instagram.png" alt="Instagram" />
              </a>
              <a href="https://www.youtube.com/">
                <img className='w-12 hover:scale-105 transition-all' src="img/youtube.png" alt="Youtube" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-green-100 to-white p-8 rounded-xl max-w-4xl mx-auto mb-12">
        {/* Help & FAQs */}
        <div className="help max-w-2xl mx-auto mt-5">
          <p className="text-2xl text-gray-700 font-bold text-center mb-7">Help & FAQs?</p>
          {accordionData.map(({ question, answer }, index) => {
            const isActive = activeAccordions.includes(index);
            return (
              <div key={index} className="mb-4 rounded">
                <button
                  className={`w-full text-left px-4 py-3 border-1 font-semibold text-lg bg-gradient-to-b from-green-400 to-green-700 text-white focus:outline-none hover:scale-x-102 transition-transform duration-300
                  ${isActive ? 'rounded-t' : 'rounded'}`}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isActive}
                >
                  {question}
                </button>
                {isActive && (
                  <div className="p-4 bg-gradient-to-b from-white to-green-100 mt-1 mb-12 border-t border-green-600">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Contact;
