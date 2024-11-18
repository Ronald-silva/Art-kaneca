// src/components/3d/ProductModels.tsx
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree, useFrame } from '@react-three/fiber';

interface ProductModelProps {
  productType: 'mug' | 'glass' | 'tile';
  customText: string;
  textPosition: { x: number, y: number };
  textColor: string;
  textRotation: number;
  imageUrl?: string;
}

const Scene = ({ 
  productType, 
  customText, 
  textPosition, 
  textColor,
  textRotation,
  imageUrl 
}: ProductModelProps) => {
  const { scene, camera } = useThree();

  useEffect(() => {
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Create product based on type
    let product: THREE.Group | THREE.Mesh;
    switch (productType) {
      case 'mug':
        product = createMug();
        break;
      case 'glass':
        product = createGlass();
        break;
      case 'tile':
        product = createTile();
        break;
      default:
        product = createMug();
    }
    scene.add(product);

    // Add custom text
    if (customText) {
      const textCanvas = document.createElement('canvas');
      const context = textCanvas.getContext('2d');
      if (context) {
        textCanvas.width = 512;
        textCanvas.height = 512;

        context.fillStyle = 'transparent';
        context.fillRect(0, 0, textCanvas.width, textCanvas.height);

        context.font = '48px Arial';
        context.fillStyle = textColor;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(customText, textCanvas.width / 2, textCanvas.height / 2);

        const texture = new THREE.CanvasTexture(textCanvas);
        const textMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(textMaterial);

        const x = (textPosition.x / 50) - 1;
        const y = (textPosition.y / 50) - 1;
        sprite.position.set(x, y, 1);
        
        sprite.scale.set(2, 2, 1);
        sprite.rotation.z = textRotation * Math.PI / 180;

        scene.add(sprite);
      }
    }

    // Add custom image
    if (imageUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(imageUrl, (texture) => {
        const imageMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(imageMaterial);
        
        const x = (textPosition.x / 50) - 1;
        const y = (textPosition.y / 50) - 1;
        sprite.position.set(x, y, 1);
        
        scene.add(sprite);
      });
    }

    return () => {
      scene.clear();
    };
  }, [scene, camera, productType, customText, textPosition, textColor, textRotation, imageUrl]);

  useFrame(() => {
    // Add any animations here if needed
  });

  return null;
};

const ProductModel = (props: ProductModelProps) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas>
        <OrbitControls enableDamping dampingFactor={0.05} />
        <Scene {...props} />
      </Canvas>
    </div>
  );
};

// Helper functions to create different product objects
const createMug = (): THREE.Group => {
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  // Create body
  const bodyGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);
  const body = new THREE.Mesh(bodyGeometry, material);

  // Create handle
  const handlePath = new THREE.CurvePath();
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(1, 0.5, 0),
    new THREE.Vector3(1.5, 0.5, 0),
    new THREE.Vector3(1.5, -0.5, 0),
    new THREE.Vector3(1, -0.5, 0)
  );
  handlePath.add(curve);
  
  const handleGeometry = new THREE.TubeGeometry(curve, 20, 0.1, 8, false);
  const handle = new THREE.Mesh(handleGeometry, material);

  // Combine body and handle
  const group = new THREE.Group();
  group.add(body);
  group.add(handle);

  return group;
};

const createGlass = (): THREE.Mesh => {
  const geometry = new THREE.CylinderGeometry(0.8, 0.6, 2, 32);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.8 
  });
  return new THREE.Mesh(geometry, material);
};

const createTile = (): THREE.Mesh => {
  const geometry = new THREE.BoxGeometry(2, 2, 0.1);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  return new THREE.Mesh(geometry, material);
};

export default ProductModel;