import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';
import { Seo } from '@/components/common/Seo';

export const NotFound = () => {
  return (
    <>
    <Seo title="Page Not Found" noindex />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="text-9xl font-bold gradient-text mb-4">404</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="group">
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
            className="group"
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};