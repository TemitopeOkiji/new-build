import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Vendors = () => {
  const [vendors, setVendors] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    const { data } = await supabase
      .from("vendors")
      .select("*")
      .order("created_at", { ascending: false });
    
    setVendors(data || []);
    setLoading(false);
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.business_name.toLowerCase().includes(search.toLowerCase()) ||
    vendor.category.toLowerCase().includes(search.toLowerCase()) ||
    vendor.location?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Browse Vendors</h1>
          <Input
            placeholder="Search by name, category, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{vendor.business_name}</CardTitle>
                    <CardDescription>{vendor.category}</CardDescription>
                  </div>
                  {vendor.verified && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      Verified
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {vendor.description || "No description available"}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{vendor.location}</span>
                  <span className="font-semibold">{vendor.price_range}</span>
                </div>
                
                {vendor.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
                  </div>
                )}
                
                <Button className="w-full">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No vendors found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;
