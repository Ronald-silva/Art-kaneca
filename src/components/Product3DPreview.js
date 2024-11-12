// src/components/Product3DPreview.js

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function ProductModel(props) {
    // Substitua '/assets/models/yourModel.glb' pelo caminho correto do seu modelo 3D
    const { nodes, materials } = useGLTF('/assets/models/yourModel.glb');
    return (
        <group {...props} dispose={null}>
            {/* Substitua 'YourMesh' e 'YourMaterial' pelos nomes corretos */}
            <mesh geometry={nodes.YourMesh.geometry} material={materials.YourMaterial} />
        </group>
    );
}

const Product3DPreview = () => {
    return (
        <Canvas style={{ height: '300px' }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <ProductModel scale={2} />
            </Suspense>
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}

export default Product3DPreview;
