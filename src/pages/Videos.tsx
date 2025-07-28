import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Videos = () => {
  return (
    <div className="min-h-screen graffiti-bg">
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        <div className="text-center mb-12">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 glitch-text text-cracra-pink"
            data-text="ODIEUSES VIDEOS"
          >
            ODIEUSES VIDEOS
          </h1>
          <p className="text-xl text-cracra-yellow">
            📹 Les clips les plus cracra du crew 📹
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="cracra-hover border-cracra-green">
              <CardHeader>
                <CardTitle className="text-cracra-pink">VIDEO CRACRA #{i}</CardTitle>
                <CardDescription className="text-cracra-yellow">
                  Un clip underground de folie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">📹</span>
                </div>
                <Button className="w-full bg-cracra-green hover:bg-cracra-pink">
                  REGARDER CETTE MERDE
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;