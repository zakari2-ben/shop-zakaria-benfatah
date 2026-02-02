import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

const AdminMessages = () => {
  const { messages, deleteMessage, markAsRead } = useShop();
  
  // États pour les filtres (Recherche, Statut, Date)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'read', 'unread'
  const [filterDate, setFilterDate] = useState(''); // État pour la date

  // Logique de filtrage combinée
  const filteredMessages = messages.filter(msg => {
    // 1. Filtre par recherche texte (Nom, Email ou Sujet)
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Filtre par statut (Lu / Non lu)
    const matchesStatus = 
      filterStatus === 'all' ? true :
      filterStatus === 'read' ? msg.isRead :
      !msg.isRead;

    // 3. Filtre par date (Compare le début de la chaîne ISO avec l'input date YYYY-MM-DD)
    const matchesDate = filterDate === '' ? true : msg.date.startsWith(filterDate);

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div>
      <h1 className="admin-title">Messagerie ({messages.length})</h1>

      {/* Barre de Filtres */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '15px', 
        marginBottom: '20px', 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        alignItems: 'flex-end' 
      }}>
        
        {/* Recherche par texte */}
        <div style={{ flex: 2, minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '600' }}>Recherche :</label>
          <input 
            type="text" 
            placeholder="🔍 Nom, Email, Sujet..." 
            className="admin-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtrage par Statut */}
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '600' }}>Statut :</label>
          <select 
            className="admin-select" 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les messages</option>
            <option value="unread">Non lus</option>
            <option value="read">Déjà lus</option>
          </select>
        </div>

        {/* Filtrage par Date */}
        <div style={{ flex: 1, minWidth: '180px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '600' }}>Date précise :</label>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input 
              type="date" 
              className="admin-input"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            {filterDate && (
              <button 
                onClick={() => setFilterDate('')}
                title="Réinitialiser la date"
                style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                X
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Liste des Messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredMessages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '8px', color: '#7f8c8d' }}>
            <p>Aucun message ne correspond à vos critères de recherche.</p>
          </div>
        ) : (
          filteredMessages.map(msg => (
            <div key={msg.id} style={{
              background: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              borderLeft: msg.isRead ? '5px solid #bdc3c7' : '5px solid #e74c3c', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#2c3e50' }}>{msg.subject}</h3>
                <span style={{ fontSize: '0.85rem', color: '#7f8c8d', fontWeight: '500' }}>
                  📅 {new Date(msg.date).toLocaleDateString()} à {new Date(msg.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              
              <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#34495e' }}>
                <strong>De:</strong> {msg.name} <span style={{ color: '#7f8c8d' }}>(&lt;{msg.email}&gt;)</span>
              </div>
              
              <p style={{ background: '#f8f9fa', padding: '15px', borderRadius: '6px', color: '#555', lineHeight: '1.5', border: '1px solid #eee' }}>
                {msg.message}
              </p>

              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                {!msg.isRead && (
                  <button 
                    onClick={() => markAsRead(msg.id)} 
                    className="admin-btn-submit" 
                    style={{ background: '#3498db', fontSize: '0.85rem', padding: '8px 15px' }}
                  >
                    Marquer comme lu
                  </button>
                )}
                
                <a 
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className="admin-btn-edit"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', fontSize: '0.85rem', padding: '8px 15px' }}
                >
                  Répondre par Email
                </a>

                <button 
                  onClick={() => { if(window.confirm('Voulez-vous vraiment supprimer ce message ?')) deleteMessage(msg.id) }} 
                  className="admin-btn-delete"
                  style={{ fontSize: '0.85rem', padding: '8px 15px' }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;