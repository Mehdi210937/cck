import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ParticleSystem from "@/components/ParticleSystem";
import SprayTag from "@/components/SprayTag";
const Index = () => {
  const recentNews = [{
    id: 1,
    title: "NOUVEAU CLIP CRACRA DISPO",
    content: "Le crew balance un nouveau clip sale qui déchire grave ! 📹",
    category: "VIDEO",
    date: "Il y a 2h"
  }, {
    id: 2,
    title: "TRACK UNDERGROUND EN PRÉPARATION",
    content: "Un son immonde qui va faire mal aux oreilles des bourgeois 🎵",
    category: "SON",
    date: "Il y a 5h"
  }, {
    id: 3,
    title: "NOUVELLE SÉRIE DE GRAFFITIS",
    content: "Des tags cracra qui envahissent la ville ! 🎨",
    category: "VISUEL",
    date: "Il y a 1 jour"
  }];
  return <div className="min-h-screen graffiti-bg cracra-cursor">
      <ParticleSystem />
      <SprayTag />
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        
        {/* Header principal */}
        <div className="text-center mb-12">
          <h1 className="text-8xl md:text-9xl font-bold mb-6 glitch-text text-cracra-green graffiti-shadow" data-text="CRACRA KREW">
            CRACRA KREW
          </h1>
          <p className="text-2xl text-cracra-pink mb-4">
            🍺 UNDERGROUND LABEL - PAS DE GIN TONIC ICI 🍺
          </p>
          <p className="text-lg text-cracra-yellow">
            On reste cracra, on reste vrais - 8.6 GANG 💀
          </p>
        </div>

        {/* Section News */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-cracra-pink mb-8 text-center">
            📰 DERNIÈRES NEWS DU LABEL 📰
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNews.map(news => <Card key={news.id} className="cracra-hover-intense spray-effect torn-edge border-cracra-green">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-cracra-yellow bg-muted px-2 py-1 rounded">
                      {news.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {news.date}
                    </span>
                  </div>
                  <CardTitle className="text-cracra-pink">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground mb-4">
                    {news.content}
                  </CardDescription>
                  <Button className="w-full bg-cracra-green hover:bg-cracra-pink cracra-shake">
                    VOIR PLUS 🍺
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-cracra-pink cracra-hover-intense spray-effect">
            <CardHeader>
              <CardTitle className="text-3xl text-cracra-pink graffiti-shadow">LES 10 COMMANDEMENTS CRACRA</CardTitle>
              <CardDescription className="text-lg text-cracra-yellow">Tu respecteras le code du CRACRA KREW 💀</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-left space-y-2 text-cracra-green font-mono">
                <p>1. Tu boiras de la 8.6, jamais de gin tonic 🍺</p>
                <p>2. Tu resteras underground, toujours 🏴</p>
                <p>3. Tu créeras du contenu cracra sans limite 🎨</p>
                <p>4. Tu soutiendras tes frères du crew 🤝</p>
                <p>5. Tu garderas l'esprit ghetto vivant 💀</p>
                <p>6. Tu partageras tes créations ignobles 📱</p>
                <p>7. Tu rejetteras le mainstream et les bourgeois 🚫</p>
                <p>8. Tu taggueras partout où tu passes 🎯</p>
                <p>9. Tu respecteras la culture de la rue 🛤️</p>
                <p>10. CRACRA KREW À VIE ! 🔥</p>
              </div>
              <Button className="w-full mt-6 bg-cracra-pink hover:bg-cracra-purple cracra-shake text-black font-bold">
                REJOINDRE LE KREW 🤘
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default Index;