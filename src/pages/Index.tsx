import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-primary">
            🚀 CRACRA KREW HQ
          </CardTitle>
          <CardDescription className="text-lg">
            Votre application est maintenant active !
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-3">
            <p className="text-muted-foreground">
              ✅ Preview chargé avec succès
            </p>
            <p className="text-sm text-muted-foreground">
              Prêt à développer votre projet
            </p>
            <Button className="w-full" size="lg">
              Commencer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
