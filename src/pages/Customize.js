// src/pages/Customize.js

import React from 'react';
import CustomizationTool from '../components/CustomizationTool';  // Importa o componente
import './Customize.css';

function Customize() {
  return (
    <main className="customize">
      
      <div className="customization-tool">
        <CustomizationTool />  {/* Adiciona a ferramenta de personalização */}
      </div>
    </main>
  );
}

export default Customize;
