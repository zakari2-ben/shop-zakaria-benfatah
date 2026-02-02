import { useShop } from '../context/ShopContext'; // Import du contexte
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  // const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const { sendMessage } = useShop();

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
      // setSubmitted(true);
      sendMessage(formData);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      
      // Ici, on simule l'envoi
      console.log("Données envoyées:", formData);
    }
    // setSent(true);
    // sendMessage(formData);
    setTimeout(() => setSent(false), 5000); // Cacher le message de succès après 3s
    
  };
  console.log(errors);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  return (
    <div className="contact-container" style={{padding: '50px', maxWidth: '800px', margin: '0 auto'}}>
      <h1>Contactez-nous</h1>
      {sent && <div style={{background: '#d4edda', color: '#155724', padding: '15px', marginBottom: '20px'}}>Message envoyé avec succès !</div>}
      
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <input 
          type="text" placeholder="Nom complet"  
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
          style={{padding: '10px', border: '1px solid #ccc'}}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input 
          type="text" placeholder="Email"  
          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
          style={{padding: '10px', border: '1px solid #ccc'}}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input 
          type="text" placeholder="Sujet"  
          value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
          style={{padding: '10px', border: '1px solid #ccc'}}
        />
        {errors.subject && <span className="error">{errors.subject}</span>}
        <textarea 
          placeholder="Votre message..." rows="5"  
          value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
          style={{padding: '10px', border: '1px solid #ccc'}}
        ></textarea>
        {errors.message && <span className="error">{errors.message}</span>}
        <button type="submit" style={{padding: '12px', background: '#333', color: 'white', border: 'none', cursor: 'pointer'}}>Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;