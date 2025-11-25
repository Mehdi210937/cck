import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      setLoading(true);
      try {
        const data = await storefrontApiRequest(PRODUCT_QUERY, { handle });
        if (data?.data?.product) {
          const productData: ShopifyProduct = { node: data.data.product };
          setProduct(productData);
          setSelectedVariant(productData.node.variants.edges[0]?.node);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Ajouté au panier");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <Header />
        <main className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">Produit non trouvé</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-12 mb-24">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="aspect-square">
            {product.node.images?.edges?.[0]?.node && (
              <img
                src={product.node.images.edges[0].node.url}
                alt={product.node.title}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold font-helvetica mb-2">{product.node.title}</h1>
              <p className="text-2xl font-semibold">
                {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
              </p>
            </div>
            
            {product.node.description && (
              <p className="text-muted-foreground leading-relaxed">{product.node.description}</p>
            )}
            
            {product.node.options.map((option) => (
              <div key={option.name} className="space-y-2">
                <label className="text-sm font-medium">{option.name}</label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const variant = product.node.variants.edges.find(v => 
                      v.node.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                    )?.node;
                    
                    return (
                      <Button
                        key={value}
                        variant={selectedVariant?.id === variant?.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {value}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="lg"
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? "Ajouter au panier" : "Rupture de stock"}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
