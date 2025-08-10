import React from 'react';

const MapLocationSection = () => {
  return (
    <div className="w-full h-52 ">
      <p className="text-xl font-semibold">Peta Lokasi Desa</p>
      <iframe
        className="w-full h-44"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d129382.4102786677!2d7.505275637331552!3d45.07026297256929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d126418be25%3A0x8903f803d69c77bf!2sTurin%2C%20Metropolitan%20City%20of%20Turin%2C%20Italy!5e1!3m2!1sen!2sid!4v1754777102482!5m2!1sen!2sid"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapLocationSection;
