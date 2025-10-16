import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ArrowRight } from "lucide-react";
import djImage from "@/assets/vendor-dj.jpg";
import cateringImage from "@/assets/vendor-catering.jpg";
import photographerImage from "@/assets/vendor-photographer.jpg";

const vendors = [
  {
    id: 1,
    name: "Elite Sound Productions",
    category: "DJ & Entertainment",
    location: "New York, NY",
    rating: 4.9,
    reviews: 127,
    price: "$$$",
    image: djImage,
    verified: true
  },
  {
    id: 2,
    name: "Gourmet Affairs Catering",
    category: "Catering Services",
    location: "Los Angeles, CA",
    rating: 5.0,
    reviews: 94,
    price: "$$$$",
    image: cateringImage,
    verified: true
  },
  {
    id: 3,
    name: "Moments Photography Studio",
    category: "Photography",
    location: "Chicago, IL",
    rating: 4.8,
    reviews: 156,
    price: "$$$",
    image: photographerImage,
    verified: true
  }
];

export const VendorShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Featured Vendors
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse our curated selection of top-rated professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {vendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="overflow-hidden hover:shadow-large transition-all duration-300 group border-border"
            >
              {/* Vendor Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {vendor.verified && (
                  <Badge className="absolute top-4 right-4 bg-primary shadow-glow">
                    Verified
                  </Badge>
                )}
              </div>

              {/* Vendor Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {vendor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {vendor.category}
                  </p>
                </div>

                {/* Rating & Location */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-medium text-foreground">{vendor.rating}</span>
                    <span className="text-muted-foreground">({vendor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.location}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-lg font-semibold text-foreground">
                    {vendor.price}
                  </span>
                  <Button variant="outline" size="sm" className="group/btn">
                    View Profile
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button size="lg" variant="default">
            Explore All Vendors
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
