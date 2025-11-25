import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2, ShoppingCart } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.preventDefault();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Ajouté au panier", {
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6 mb-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Shop</h1>
          <CartDrawer />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-4">Aucun produit disponible</p>
            <p className="text-sm text-muted-foreground">
              Créez votre premier produit en me disant ce que vous souhaitez vendre.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link key={product.node.id} to={`/product/${product.node.handle}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="aspect-square relative">
                    {product.node.images?.edges?.[0]?.node ? (
                      <img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-bold font-helvetica text-sm mb-1 line-clamp-2">{product.node.title}</h3>
                    <p className="text-sm font-semibold mb-2">
                      {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                      {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-auto"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
