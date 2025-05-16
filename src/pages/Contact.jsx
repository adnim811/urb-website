import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'student', // Default value
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Thanks for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      type: 'student',
      message: ''
    });
  };

  return (
    <div className="page contact-page">
      <main className="app-main">
        <h1>Contact Us</h1>
        <p className="lead">We'd love to hear from you! Fill out the form below to get in touch.</p>
        
        <section className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="type">I am a:</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="client">Client</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </section>
        
        <section className="card">
          <h2>Other Ways to Reach Us</h2>
          <p>
            <strong>Email:</strong> info@urbconsulting.com<br />
            <strong>Phone:</strong> (123) 456-7890
          </p>
        </section>
      </main>
    </div>
  );
}

export default Contact; 