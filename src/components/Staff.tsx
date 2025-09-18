"use client"

import { useState } from "react"
import { addStaff } from "@/utils/firestore"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Upload from "./Upload"

export default function Staff() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    role: "",
    imageUrl: "",
    bio: "",
    twitter: "", 
    linkedin: "", 
    email: ""
  })
  const [imageUrl, setImageUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if (!imageUrl) {
      toast.error("Please Upload an Image")
      setLoading(false) // Set loading to false on error
      return
    }
    try {
      await addStaff({
        name: form.name,
        role: form.role,
        bio: form.bio,
        socials: {
          twitter: form.twitter,
          linkedin: form.linkedin,
          email: form.email,
        },
        imageUrl,
      })

      toast.success("Staff Registered Successfully")
      setForm({
        name: "",
        role: "",
        imageUrl: "",
        bio: "",
        twitter: "", 
        linkedin: "", 
        email: ""
      })
      setImageUrl("")
      router.push('/dashboard')
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error adding staff details")
    } finally {
      setLoading(false); // Ensure loading is always reset
    }
  }

  return(
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-xl w-full space-y-8 bg-gray-50 p-8 rounded-xl shadow-2xl border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Staff Member
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill out the form below to create a new staff profile.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="text"
              name="role"
              placeholder="Role / Title"
              value={form.role}
              onChange={handleChange}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div>
            <textarea
              name="bio"
              placeholder="Biography (short)"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Links
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" name="twitter" placeholder="Twitter URL" value={form.twitter} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
              <input type="text" name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
              <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <Upload onUploadSuccess={url => setImageUrl(url)} />
            {imageUrl && (
              <p className="mt-2 text-sm text-green-600">Image uploaded successfully! ✅</p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Save Staff'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}