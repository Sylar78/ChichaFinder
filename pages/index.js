// Home page
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { Search, MapPin, Heart, Star } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Home() {
  const features = [
    {
      icon: Search,
      title: 'Recherche Avancée',
      description: 'Trouvez des bars à chicha avec des filtres personnalisés (distance, prix, notes, équipements)'
    },
    {
      icon: MapPin,
      title: 'Carte Interactive',
      description: 'Visualisez tous les bars sur une carte OpenStreetMap interactive'
    },
    {
      icon: Heart,
      title: 'Ma Collection',
      description: 'Créez et gérez votre collection personnelle de chichas préférées'
    },
    {
      icon: Star,
      title: 'Avis & Notes',
      description: 'Consultez et partagez des avis pour aider la communauté'
    }
  ];

  return (
    <Layout title="ChichaAroundMe - Trouvez les meilleurs bars à chicha">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Découvrez les Meilleurs Bars à Chicha
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Recherchez, découvrez et partagez vos expériences dans les bars à chicha près de vous
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/recherche">
                <Button size="lg" variant="primary" className="bg-white text-primary-600 hover:bg-gray-100">
                  Commencer la recherche
                </Button>
              </Link>
              <Link href="/carte">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Voir la carte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tout ce dont vous avez besoin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à découvrir votre prochain spot ?
            </h2>
            <p className="text-gray-600 mb-8">
              Rejoignez notre communauté et partagez vos expériences
            </p>
            <Link href="/collection">
              <Button size="lg" variant="primary">
                Créer ma collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
