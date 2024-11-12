// src/components/CustomizationTool.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import './CustomizationTool.css';

const CustomizationTool = () => {
    const [color, setColor] = useState('#ffffff');
    const [text, setText] = useState('Seu Texto Aqui');
    const [image, setImage] = useState(null);
    const [fontSize, setFontSize] = useState(24);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [textPosition, setTextPosition] = useState({ top: '50%', left: '50%' }); // Estado para posição do texto
    const navigate = useNavigate(); // Usando useNavigate

    // Funções de manipulação de estados
    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };

    const handleFontFamilyChange = (e) => {
        setFontFamily(e.target.value);
    };

    const handleTextPositionChange = (e) => { // Função para alterar a posição do texto
        const { name, value } = e.target;
        setTextPosition(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveAndCheckout = () => {
        const customizationData = {
            color,
            text,
            image,
            fontSize,
            fontFamily,
            textPosition // Inclui posição do texto no salvamento
        };
        localStorage.setItem('customizationData', JSON.stringify(customizationData));
        navigate('/checkout'); // Usando navigate para redirecionar
    };

    return (
        <div className="customization-tool">
            <h2>Personalize Seu Produto</h2>
            <div className="product-preview" style={{ backgroundColor: color }}>
                <div className="text-preview" style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily, top: textPosition.top, left: textPosition.left, position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                    {text}
                </div>
                {image && <img src={image} alt="Custom preview" className="image-preview" />}
            </div>

            <div className="customization-options">
                <div className="option">
                    <label htmlFor="colorPicker">Escolha a Cor:</label>
                    <input
                        type="color"
                        id="colorPicker"
                        value={color}
                        onChange={handleColorChange}
                    />
                </div>

                <div className="option">
                    <label htmlFor="textInput">Insira seu Texto:</label>
                    <input
                        type="text"
                        id="textInput"
                        value={text}
                        onChange={handleTextChange}
                    />
                </div>

                <div className="option">
                    <label htmlFor="fontSizeInput">Tamanho do Texto:</label>
                    <input
                        type="number"
                        id="fontSizeInput"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        min="10"
                        max="100"
                    />
                </div>

                <div className="option">
                    <label htmlFor="fontFamilySelect">Escolha a Fonte:</label>
                    <select
                        id="fontFamilySelect"
                        value={fontFamily}
                        onChange={handleFontFamilyChange}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                </div>

                {/* Adicionando a nova funcionalidade para alterar a posição do texto */}
                <div className="option">
                    <label>Posição do Texto:</label>
                    <div>
                        <label htmlFor="textTop">Top:</label>
                        <input
                            type="number"
                            id="textTop"
                            name="top"
                            value={textPosition.top}
                            onChange={handleTextPositionChange}
                        />
                        <label htmlFor="textLeft">Left:</label>
                        <input
                            type="number"
                            id="textLeft"
                            name="left"
                            value={textPosition.left}
                            onChange={handleTextPositionChange}
                        />
                    </div>
                </div>

                <div className="option">
                    <label htmlFor="imageUpload">Adicione uma Imagem:</label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <button onClick={handleSaveAndCheckout}>Salvar e Prosseguir para Checkout</button>
            </div>
        </div>
    );
};

export default CustomizationTool;
