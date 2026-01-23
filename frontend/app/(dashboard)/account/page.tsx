"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Lock,
  Bell,
  Upload,
  Shield,
  Smartphone,
  Monitor,
  Mail,
  CheckCircle2,
  AlertCircle,
  Camera,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Clock,
  Building,
  Globe,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";
import { UserProfile } from "@/types/roadmap";
import { userAPI } from "@/utils/api";
import { toast } from "sonner";

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profile1, setProfile1] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("account");

  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState("");

  useEffect(() => {
    const fetchProf = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await userAPI.getProfile();
        console.log("Profile data:", res);

        if (!res || res.length === 0) {
          setError("Profile not found");
          return;
        }

        setProfile(res[0]);
        setProfile1(res[0]);
        setProfilePicPreview(res[0].photo_url || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProf();
  }, []);

  const handleNext = () => {
    // Navigate to career tab
    setActiveTab("career");
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = e.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "photo_url") {
          setProfilePicPreview(reader.result as string);
          setProfile({
            ...profile,
            photo_url: reader.result as string,
          } as UserProfile);
        } else if (type === "cover_photo_url") {
          setCoverImagePreview(reader.result as string);
          setProfile({
            ...profile,
            cover_photo_url: reader.result as string,
          } as UserProfile);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearAccount = () => {
    // Reset to original profile data
    if (profile) {
      // Refetch or reset to initial values
      setProfile(profile1);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      await userAPI.updateProfile(profile);

      toast("Success!", {
        description: "Your profile has been updated successfully.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      toast("Error", {
        description:
          err instanceof Error ? err.message : "Failed to update profile",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } finally {
      setSaving(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-[#888888] text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] max-w-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Error Loading Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#888888]">
              {error || "Failed to load your profile."}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Account Settings
          </h1>
          <p className="text-[#888888] text-lg">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-[#161616] border border-[#2A2A2A] p-1 rounded-xl w-full sm:w-auto">
            <TabsTrigger
              value="account"
              className="cursor-pointer data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger
              value="career"
              className="cursor-pointer data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Career
            </TabsTrigger>
            <TabsTrigger
              value="security"
              disabled
              className="cursor-not-allowed data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all opacity-50"
            >
              <Lock className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  Profile Information
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Update your account profile information and email address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-[#2A2A2A]">
                      <AvatarImage src={profilePicPreview || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-white to-gray-300 text-black text-2xl font-bold">
                        {profile.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Profile Picture
                      </h3>
                      <p className="text-sm text-[#888888]">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Input
                        // variant="outline"
                        type="file"
                        placeholder="Change Avatar"
                        onChange={(e) => handleFileChange(e, "photo_url")}
                        // size="sm"
                        className="w-md border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                      >
                        {/* <Upload className="mr-2 h-4 w-4" />
                        Change Avatar */}
                      </Input>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#2A2A2A]" />

                {/* Form Fields */}
                <div className="grid gap-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-white text-sm font-medium"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profile.name || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="text-white text-sm font-medium"
                      >
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={profile.username || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, username: e.target.value })
                        }
                        disabled
                        className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-white text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
                      <Input
                        disabled
                        id="email"
                        type="email"
                        value={profile.email || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11 pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#2A2A2A]" />

                {/* Address Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#888888]" />
                    Address Information
                  </h3>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="street"
                        className="text-white text-sm font-medium"
                      >
                        Street Address
                      </Label>
                      <Input
                        id="street"
                        value={profile.street_address || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            street_address: e.target.value,
                          })
                        }
                        className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="city"
                          className="text-white text-sm font-medium"
                        >
                          City
                        </Label>
                        <Input
                          id="city"
                          value={profile.city || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, city: e.target.value })
                          }
                          className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                          placeholder="San Francisco"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="region"
                          className="text-white text-sm font-medium"
                        >
                          State / Region
                        </Label>
                        <Input
                          id="region"
                          value={profile.region || ""}
                          onChange={(e) =>
                            setProfile({ ...profile, region: e.target.value })
                          }
                          className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                          placeholder="California"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="country"
                          className="text-white text-sm font-medium"
                        >
                          Country
                        </Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
                          <Input
                            id="country"
                            value={profile.country || ""}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                country: e.target.value,
                              })
                            }
                            className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11 pl-10"
                            placeholder="United States"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="postal"
                          className="text-white text-sm font-medium"
                        >
                          Postal Code
                        </Label>
                        <Input
                          id="postal"
                          value={profile.postal_code || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              postal_code: e.target.value,
                            })
                          }
                          className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                          placeholder="94102"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-[#2A2A2A]" />

                {/* Account Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
                    <Calendar className="h-5 w-5 text-[#888888]" />
                    <div>
                      <p className="text-xs text-[#666666]">Member Since</p>
                      <p className="text-sm font-medium text-white">
                        {profile?.created_at
                          ? new Date(profile?.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A]">
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                    <p className="text-sm text-[#888888]">Email verified</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleClearAccount}
                    disabled={saving}
                    className="cursor-pointer border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={saving}
                    className="cursor-pointer bg-white text-black hover:bg-gray-200 font-semibold"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Career Tab */}
          <TabsContent value="career" className="space-y-6">
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <Briefcase className="h-5 w-5 text-[#888888]" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">
                      Career Information
                    </CardTitle>
                    <CardDescription className="text-[#888888]">
                      Manage your career preferences and goals
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="current_job"
                      className="text-white text-sm font-medium"
                    >
                      Current Job Title
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
                      <Input
                        id="current_job"
                        value={profile.current_job || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            current_job: e.target.value,
                          })
                        }
                        className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11 pl-10"
                        placeholder="Senior Software Engineer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="expected_role"
                      className="text-white text-sm font-medium"
                    >
                      Expected / Target Role
                    </Label>
                    <Input
                      id="expected_role"
                      value={profile.expected_role || ""}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          expected_role: e.target.value,
                        })
                      }
                      className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                      placeholder="Engineering Manager"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="expected_ctc"
                        className="text-white text-sm font-medium"
                      >
                        Expected CTC
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
                        <Input
                          id="expected_ctc"
                          value={profile.expected_ctc || ""}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              expected_ctc: e.target.value,
                            })
                          }
                          className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11 pl-10"
                          placeholder="150,000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="transition_time"
                        className="text-white text-sm font-medium"
                      >
                        Transition Timeline
                      </Label>
                      <Select
                        value={profile.transition_time || ""}
                        onValueChange={(value) =>
                          setProfile({ ...profile, transition_time: value })
                        }
                      >
                        <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#161616] border-[#2A2A2A]">
                          <SelectItem
                            value="immediate"
                            className="text-white hover:bg-[#2A2A2A]"
                          >
                            Immediate (0-1 month)
                          </SelectItem>
                          <SelectItem
                            value="short"
                            className="text-white hover:bg-[#2A2A2A]"
                          >
                            Short term (1-3 months)
                          </SelectItem>
                          <SelectItem
                            value="medium"
                            className="text-white hover:bg-[#2A2A2A]"
                          >
                            Medium term (3-6 months)
                          </SelectItem>
                          <SelectItem
                            value="long"
                            className="text-white hover:bg-[#2A2A2A]"
                          >
                            Long term (6+ months)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="career_note"
                      className="text-white text-sm font-medium"
                    >
                      Career Notes
                    </Label>
                    <Textarea
                      id="career_note"
                      value={profile.career_note || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, career_note: e.target.value })
                      }
                      className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] resize-none"
                      rows={4}
                      placeholder="Share your career goals, aspirations, or any relevant notes..."
                    />
                    <p className="text-xs text-[#666666]">
                      This information helps us provide better recommendations
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("account")}
                    disabled={saving}
                    className="border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={saving}
                    className="bg-white text-black hover:bg-gray-200 font-semibold min-w-[120px]"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Password Card */}
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <Lock className="h-5 w-5 text-[#888888]" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">
                      Password
                    </CardTitle>
                    <CardDescription className="text-[#888888]">
                      Change your password to keep your account secure
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="current-password"
                    className="text-white text-sm font-medium"
                  >
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="new-password"
                    className="text-white text-sm font-medium"
                  >
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                  />
                  <p className="text-xs text-[#666666]">
                    Must be at least 8 characters with a mix of letters, numbers
                    & symbols
                  </p>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="text-white text-sm font-medium"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#3A3A3A] h-11"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-white text-black hover:bg-gray-200 font-semibold">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 2FA Card */}
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <Shield className="h-5 w-5 text-[#888888]" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription className="text-[#888888]">
                      Add an extra layer of security to your account
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border-2 border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30">
                      <Shield className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-white">Enable 2FA</p>
                      <p className="text-sm text-[#888888]">
                        Require a verification code in addition to your password
                      </p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-[#2A2A2A] scale-125" />
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions Card */}
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  Active Sessions
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Manage your active sessions across devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    device: "MacBook Pro",
                    location: "San Francisco, US",
                    lastActive: "Current session",
                    icon: Monitor,
                    current: true,
                  },
                  {
                    device: "iPhone 14",
                    location: "San Francisco, US",
                    lastActive: "2 hours ago",
                    icon: Smartphone,
                    current: false,
                  },
                ].map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-[#2A2A2A]">
                        <session.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">
                            {session.device}
                          </p>
                          {session.current && (
                            <Badge
                              variant="outline"
                              className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
                            >
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#888888] mt-0.5">
                          {session.location}
                        </p>
                        <p className="text-xs text-[#666666] mt-1">
                          {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      >
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <Card className="mt-8 bg-gradient-to-br from-red-500/5 to-[#0F0F0F] border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400 text-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-[#888888]">
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A] border border-red-500/20">
              <div className="space-y-1">
                <p className="font-medium text-white">Delete Account</p>
                <p className="text-sm text-[#888888]">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
