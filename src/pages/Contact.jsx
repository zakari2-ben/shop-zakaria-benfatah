import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Nom requis";
    if (!formData.email) {
        tempErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Email invalide";
    }
    if (!formData.message) tempErrors.message = "Message requis";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Ici, on simule l'envoi
      console.log("Données envoyées:", formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container contact-container">
      <h1>Contactez-nous</h1>
      {submitted ? (
        <div className="success-message">Merci ! Votre message a été envoyé.</div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Nom Complet</label>
            <input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn-add">Envoyer</button>
        </form>
      )}
    </div>
  );
};

export default Contact;