"use client";

import { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { authApi, userAPI } from "@/utils/api";
import CountrySelect from "@/components/country";
import { useRouter } from "next/navigation";

export default function Example() {
  const router = useRouter();
  //   career_note: null;
  //   city: null;
  //   country: null;
  //   cover_photo_url: null;
  //   created_at: "2025-08-23T19:22:09.950113";
  //   current_job: null;
  //   email: null;
  //   expected_ctc: null;
  //   expected_role: null;
  //   id: "8fd23209-14bd-4f13-a3ff-15a5137e173f";
  //   name: "test user";
  //   photo_url: null;
  //   postal_code: null;
  //   region: null;
  // street_address: null;
  // transition_time: null;
  // updated_at: "2025-08-23T19:22:09.950113";
  // user_id: "b106eee0-63a1-43b6-86b4-c8c2e1c0d492";
  // username: "dofo2427-123";
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState({
    user_id: "",
    name: "",
    username: "",
    about: "",
    email: "",
    country: "",
    region: "",
    street_address: "",
    city: "",
    postal_code: "",
    photo_url: "",
    cover_photo_url: "",
    current_job: "",
    expected_role: "",
    expected_ctc: "",
    transition_time: "",
    career_note: "",
  });
  const [loading, setLoading] = useState(false);

  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState("");

  const generateUsername = (name: string) => {
    const base = name ? name.toLowerCase().replace(/\s+/g, "") : "user";
    const uniqueSuffix = Math.floor(100 + Math.random() * 900); // random 3 digit number
    return `${base}-${uniqueSuffix}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const res = await userAPI.getProfile();
      if (res.data) {
        console.log("prof", res.data);
        setProfile(res.data[0]);
        if (res.data[0].photo_url && res.data[0].cover_photo_url) {
          console.log("Profile pictures found");
          setProfilePicPreview(res.data[0].photo_url);
          setCoverImagePreview(res.data[0].cover_photo_url);
        }
        if (res.data[0].email && res.data[0].username) {
          router.replace("/dashboard");
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await authApi.getUser();
      if (res.data?.user?.email && !profile.username) {
        console.log("email", res.data?.user?.email);
        setProfile((profile) => ({
          ...profile,
          email: res.data?.user?.email,
          username: generateUsername(res.data.user.email.split("@")[0]),
        }));
        setEmail(res.data?.user?.email);
      }
      setProfile((profile) => ({
        ...profile,
        user_id: res.data?.user?.id,
      }));
      console.log(res.data?.user);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    n: string
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [n]: value }));
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
          setProfile((prev) => ({
            ...prev,
            photo_url: reader.result as string,
          }));
        } else if (type === "cover_photo_url") {
          setCoverImagePreview(reader.result as string);
          setProfile((prev) => ({
            ...prev,
            cover_photo_url: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    console.log("profile");
    e.preventDefault();
    try {
      console.log(profile);
      if (!profile.email) {
        setProfile((prev) => ({ ...prev, email }));
      }
      const res = await userAPI.updateProfile(profile);
      setLoading(false);
      console.log("update profile", res);
      if (res.status == 200) {
        router.replace("/dashboard");
        // await authApi.updateProfile(profile);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen space-x-2">
        <div className="w-6 h-6 bg-blue-500/50 rounded animate-bounce hover:scale-125 hover:bg-blue-500/70 transition"></div>
        <div className="w-6 h-6 bg-green-500/50 rounded animate-bounce [animation-delay:0.2s] hover:scale-125 hover:bg-green-500/70 transition"></div>
        <div className="w-6 h-6 bg-purple-500/50 rounded animate-bounce [animation-delay:0.4s] hover:scale-125 hover:bg-purple-500/70 transition"></div>
        <div className="w-6 h-6 bg-pink-500/50 rounded animate-bounce [animation-delay:0.6s] hover:scale-125 hover:bg-pink-500/70 transition"></div>
      </div>
    );
  }

  return (
    <form className="mx-auto px-20 max-w-4xl my-20" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">
                    @
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    readOnly
                    disabled
                    // onChange={(e) => handleChange(e, "username")}
                    value={profile.username}
                    placeholder="janesmith"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-white"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  onChange={(e) => handleChange(e, "about")}
                  value={profile.about}
                  rows={3}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-400">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm/6 font-medium text-white"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {profilePicPreview ? (
                  <img
                    src={profilePicPreview}
                    alt="profile preview"
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <UserCircleIcon
                    aria-hidden="true"
                    className="h-12 w-12 text-gray-500"
                  />
                )}
                <label className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 cursor-pointer">
                  <span>Change</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "photo_url")}
                  />
                </label>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-white"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  {coverImagePreview ? (
                    <img
                      src={coverImagePreview}
                      alt="cover preview"
                      className="h-32 w-full object-cover"
                    />
                  ) : (
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-600"
                    />
                  )}
                  <div className="mt-4 flex text-sm/6 text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "cover_photo_url")}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-white"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  value={profile.name?.split(" ")[0]}
                  required
                  onChange={(e) => handleChange(e, "name")}
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-white"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  value={profile.name?.split(" ")[1]}
                  onChange={(e) => {
                    setProfile({
                      ...profile,
                      name: `${
                        profile?.name ? profile.name.split(" ")[0] : ""
                      } ${e.target.value}`,
                    });
                  }}
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  readOnly
                  disabled
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm/6 font-medium text-white"
              >
                Country
              </label>
              <div className="mt-2 grid grid-cols-1">
                <CountrySelect
                  value={profile.country}
                  onChange={(val) =>
                    setProfile((prev) => ({ ...prev, country: val }))
                  }
                />
                {/* <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                /> */}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm/6 font-medium text-white"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  value={profile.street_address}
                  onChange={(e) => handleChange(e, "street_address")}
                  required
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm/6 font-medium text-white"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={(e) => handleChange(e, "city")}
                  required
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm/6 font-medium text-white"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  value={profile.region}
                  onChange={(e) => handleChange(e, "region")}
                  type="text"
                  required
                  autoComplete="address-level1"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm/6 font-medium text-white"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  value={profile.postal_code}
                  onChange={(e) => handleChange(e, "postal_code")}
                  required
                  autoComplete="postal-code"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Job Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Provide your current and expected job details.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="current-job"
                className="block text-sm/6 font-medium text-white"
              >
                Current Job Title
              </label>
              <div className="mt-2">
                <input
                  id="current-job"
                  name="current-job"
                  type="text"
                  value={profile.current_job}
                  onChange={(e) => handleChange(e, "current_job")}
                  required
                  placeholder="Software Engineer"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="expected-role"
                className="block text-sm/6 font-medium text-white"
              >
                Expected Job Role
              </label>
              <div className="mt-2">
                <input
                  id="expected-role"
                  name="expected-role"
                  value={profile.expected_role}
                  onChange={(e) => handleChange(e, "expected_role")}
                  required
                  type="text"
                  placeholder="Senior AI Engineer"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="expected-ctc"
                className="block text-sm/6 font-medium text-white"
              >
                Expected CTC
              </label>
              <div className="mt-2">
                <input
                  id="expected-ctc"
                  name="expected-ctc"
                  value={profile.expected_ctc}
                  onChange={(e) => handleChange(e, "expected_ctc")}
                  required
                  type="text"
                  placeholder="e.g. $110,000 / year OR ₹20 LPA"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="transition-time"
                className="block text-sm/6 font-medium text-white"
              >
                Timeline (within how long)
              </label>
              <div className="mt-2">
                <select
                  id="transition-time"
                  name="transition-time"
                  value={profile.transition_time}
                  onChange={(e) => handleChange(e, "transition_time")}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                >
                  <option className="bg-black" value="">
                    Select a timeline
                  </option>
                  <option className="bg-black">Immediately</option>
                  <option className="bg-black">Within 3 months</option>
                  <option className="bg-black">Within 6 months</option>
                  <option className="bg-black">1 year</option>
                  <option className="bg-black">More than 1 year</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="career-note"
                className="block text-sm/6 font-medium text-white"
              >
                Career Note (optional)
              </label>
              <div className="mt-2">
                <textarea
                  id="career-note"
                  name="career-note"
                  value={profile.career_note}
                  onChange={(e) => handleChange(e, "career_note")}
                  rows={3}
                  placeholder="e.g. Looking to grow into leadership roles, work on applied AI projects, open to relocation."
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
