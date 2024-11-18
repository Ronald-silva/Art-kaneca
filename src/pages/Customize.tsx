// src/pages/Customize.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useToast } from "../components/ui/use-toast";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import ProductModel from "../components/3d/ProductModels";
import {
  ShoppingBag,
  Upload,
  Type,
  Image as ImageIcon,
  RotateCcw,
  MoveHorizontal,
  MoveVertical,
  MousePointer2
} from "lucide-react";

interface Position {
  x: number;
  y: number;
}

type ProductType = 'mug' | 'glass' | 'tile';

// Constantes para imagens dos produtos
const PRODUCT_IMAGES = {
  mug: {
    standard: "/products/standard-mug.png",
    magic: "/products/magic-mug.png",
    custom: "/products/custom-mug.png",
  },
  glass: "/products/standard-glass.png",
  tile: "/products/standard-tile.png",
} as const;

const PRODUCT_TYPES: Record<ProductType, { 
  name: string; 
  price: number;
  description: string;
  defaultImage: string;
}> = {
  mug: { 
    name: "Caneca", 
    price: 39.90,
    description: "Personalização em cerâmica de alta qualidade",
    defaultImage: PRODUCT_IMAGES.mug.standard
  },
  glass: { 
    name: "Copo", 
    price: 34.90,
    description: "Copo térmico com sua arte exclusiva",
    defaultImage: PRODUCT_IMAGES.glass
  },
  tile: { 
    name: "Azulejo", 
    price: 29.90,
    description: "Azulejo decorativo personalizado",
    defaultImage: PRODUCT_IMAGES.tile
  }
};

const Customize = () => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<ProductType>("mug");
  const [customText, setCustomText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [fontSize, setFontSize] = useState<number>(24);
  const [textRotation, setTextRotation] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string>(PRODUCT_TYPES.mug.defaultImage);
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<"move" | "rotate">("move");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Criar objeto do produto personalizado
    const customProduct = {
      id: Date.now(), // Identificador único
      name: `${PRODUCT_TYPES[selectedProduct].name} Personalizada`,
      price: PRODUCT_TYPES[selectedProduct].price,
      image: previewUrl,
      customization: {
        text: customText,
        textColor,
        fontSize,
        textRotation,
        position,
        uploadedImage
      }
    };

    // Adicionar ao carrinho
    addItem(customProduct);

    toast({
      title: "Produto adicionado ao carrinho!",
      description: `${PRODUCT_TYPES[selectedProduct].name} personalizado(a) foi adicionado(a) ao carrinho.`,
    });
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCustomText(e.target.value);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const container = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - container.left) / container.width) * 100;
    const y = ((e.clientY - container.top) / container.height) * 100;

    if (dragMode === "move") {
      setPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
      });
    } else {
      const centerX = container.width / 2;
      const centerY = container.height / 2;
      const angle = Math.atan2(
        e.clientY - container.top - centerY,
        e.clientX - container.left - centerX
      );
      setTextRotation((angle * 180) / Math.PI);
    }
  };

  const handleProductChange = (value: string) => {
    const productType = value as ProductType;
    setSelectedProduct(productType);
    setPreviewUrl(PRODUCT_TYPES[productType].defaultImage);
    // Reset customization when changing product
    setPosition({ x: 50, y: 50 });
    setTextRotation(0);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-secondary mb-4">
            Personalize Seu Produto
          </h1>
          <p className="text-lg text-textColor/80 max-w-2xl mx-auto">
            Crie um produto único com suas fotos e mensagens especiais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Preview Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div 
                className="aspect-square rounded-lg overflow-hidden bg-white shadow-inner relative cursor-grab active:cursor-grabbing"
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onMouseMove={handleDrag}
              >
                <ProductModel
                  productType={selectedProduct}
                  customText={customText}
                  textPosition={position}
                  textColor={textColor}
                  textRotation={textRotation}
                  imageUrl={uploadedImage || previewUrl}
                />
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className={`text-sm ${dragMode === "move" ? "bg-primary/10" : ""}`}
                  onClick={() => setDragMode("move")}
                >
                  <MousePointer2 className="h-4 w-4 mr-2" />
                  Mover
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`text-sm ${dragMode === "rotate" ? "bg-primary/10" : ""}`}
                  onClick={() => setDragMode("rotate")}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Rotacionar
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Posição Horizontal</Label>
                  <div className="flex items-center gap-2">
                    <MoveHorizontal className="h-4 w-4" />
                    <Slider
                      value={[position.x]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setPosition(prev => ({ ...prev, x: value[0] }))}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Posição Vertical</Label>
                  <div className="flex items-center gap-2">
                    <MoveVertical className="h-4 w-4" />
                    <Slider
                      value={[position.y]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setPosition(prev => ({ ...prev, y: value[0] }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Customization Form */}
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-playfair font-semibold text-secondary">
                  Escolha o Produto
                </h3>
                <RadioGroup
                  value={selectedProduct}
                  onValueChange={handleProductChange}
                  className="grid grid-cols-3 gap-4"
                >
                  {Object.entries(PRODUCT_TYPES).map(([type, info]) => (
                    <div key={type}>
                      <RadioGroupItem
                        value={type}
                        id={type}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={type}
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <img
                          src={info.defaultImage}
                          alt={info.name}
                          className="w-16 h-16 object-contain mb-2"
                        />
                        <span>{info.name}</span>
                        <span className="text-sm text-textColor/70">
                          R$ {info.price.toFixed(2)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Tabs defaultValue="text" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="text" className="flex-1">
                    <Type className="h-4 w-4 mr-2" />
                    Texto
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex-1">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Imagem
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Mensagem Personalizada</Label>
                    <Textarea
                      id="text"
                      value={customText}
                      onChange={handleTextChange}
                      placeholder="Digite sua mensagem especial..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cor do Texto</Label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={handleColorChange}
                        className="w-full h-10 rounded-md cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tamanho da Fonte</Label>
                      <Slider
                        value={[fontSize]}
                        min={12}
                        max={48}
                        step={1}
                        onValueChange={(value) => setFontSize(value[0])}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Enviar Imagem</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => document.getElementById("image")?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Escolher Arquivo
                      </Button>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {uploadedImage && (
                      <div className="mt-2">
                        <img
                          src={uploadedImage}
                          alt="Preview da imagem carregada"
                          className="w-32 h-32 object-contain border rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                           className="mt-2 py-1 px-2 text-sm"
                          onClick={() => setUploadedImage(null)}
                        >
                          Remover Imagem
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <Button type="submit" className="w-full bg-primary text-secondary hover:bg-primary/90">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
                <span className="ml-2">
                  R$ {PRODUCT_TYPES[selectedProduct].price.toFixed(2)}
                </span>
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customize;