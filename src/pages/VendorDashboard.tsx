import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

const VendorDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    business_name: "",
    category: "",
    description: "",
    location: "",
    price_range: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setUser(user);
    
    // Load vendor profile
    const { data } = await supabase
      .from("vendors")
      .select("*")
      .eq("user_id", user.id)
      .single();
    
    if (data) {
      setVendorProfile(data);
      setFormData({
        business_name: data.business_name || "",
        category: data.category || "",
        description: data.description || "",
        location: data.location || "",
        price_range: data.price_range || "",
      });
    }
    
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/");
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    
    try {
      const vendorData = {
        user_id: user.id,
        ...formData,
      };

      if (vendorProfile) {
        await supabase
          .from("vendors")
          .update(vendorData)
          .eq("user_id", user.id);
      } else {
        await supabase.from("vendors").insert(vendorData);
      }

      toast({
        title: "Success!",
        description: "Your profile has been saved",
      });
      
      checkUser();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user || !vendorProfile) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Math.random()}.${fileExt}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('vendor-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('vendor-media')
        .getPublicUrl(filePath);

      await supabase.from('vendor_media').insert({
        vendor_id: vendorProfile.id,
        media_url: publicUrl,
        media_type: file.type.startsWith('image/') ? 'image' : 'video',
      });

      toast({
        title: "Success!",
        description: "Media uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Vendor Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
            <CardDescription>Update your vendor information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                value={formData.business_name}
                onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                placeholder="Your Business Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Catering, Photography, DJ"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your services"
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price_range">Price Range</Label>
                <Input
                  id="price_range"
                  value={formData.price_range}
                  onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                  placeholder="e.g., $$-$$$"
                />
              </div>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>

        {vendorProfile && (
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Upload images and videos of your work</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
