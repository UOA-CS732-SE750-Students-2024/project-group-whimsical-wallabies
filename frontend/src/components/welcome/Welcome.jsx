import React from 'react';

const Welcome = () => {
  return (
    <div
      style={{
        minHeight: '80vh', // Ensures full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px', // Add padding for content
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
          Welcome to Paw Mate!
        </h1>
        <p style={{ fontSize: '18px', lineHeight: '1.5', color: '#333' }}>
          Paw Mate is your go-to platform for finding the perfect playdate for your pet. Whether you
          have a dog, cat, or any furry friend, Paw Mate helps you discover personalized playdates
          based on your pet&apos;s size, energy level, and personality.
        </p>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginTop: '40px',
            marginBottom: '20px'
          }}
        >
          Key Features:
        </h2>
        <ul
          style={{
            fontSize: '18px',
            lineHeight: '1.5',
            color: '#333',
            textAlign: 'left',
            paddingLeft: '20px'
          }}
        >
          <li>
            <strong>MY DOGS:</strong> Access all your dogs&apos; information, where you can add,
            edit, review, or delete their details.
          </li>
          <li>
            <strong>FRIENDS:</strong> View your friend list, see who has matched with you, and
            explore potential playdates for your pets.
          </li>
          <li>
            <strong>MATCHING:</strong> Engage in matching with other users&apos; dogs to find
            compatible playmates for your furry companions.
          </li>
        </ul>
        <p style={{ fontSize: '18px', lineHeight: '1.5', color: '#333', marginTop: '40px' }}>
          Start connecting with fellow pet owners and make your pet&apos;s social life more fun and
          exciting with Paw Mate!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
