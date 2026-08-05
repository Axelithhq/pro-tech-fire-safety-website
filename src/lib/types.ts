export interface IndustryRow {
  id: string; name: string; slug: string; description: string; icon: string; image_url: string | null; project_count: number; sort_order: number; is_active: boolean; created_at: string
}
export interface ServiceRow {
  id: string; title: string; slug: string; subtitle: string | null; description: string; icon: string; image_url: string | null; features: string[]; is_featured: boolean; sort_order: number; is_active: boolean; created_at: string
}
export interface CategoryRow {
  id: string; name: string; slug: string; description: string | null; image_url: string | null; sort_order: number; is_active: boolean; created_at: string
}
export interface ProductRow {
  id: string; category_id: string | null; title: string; slug: string; description: string; applications: string[]; specifications: Record<string, string>; image_url: string | null; brochure_url: string | null; is_active: boolean; sort_order: number; created_at: string
}
export interface ProjectRow {
  id: string; title: string; slug: string; client: string; industry: string; location: string; city: string; state: string; scope: string; details: string; status: string; completion_year: string; image_url: string | null; coordinates: { lat: number; lng: number }; is_featured: boolean; is_active: boolean; created_at: string
}
export interface GalleryRow {
  id: string; title: string; category: string; image_url: string | null; description: string | null; sort_order: number; is_active: boolean; created_at: string
}
export interface CertificationRow {
  id: string; name: string; slug: string; category: string; description: string | null; image_url: string | null; sort_order: number; is_active: boolean; created_at: string
}
export interface ClientRow {
  id: string; name: string; slug: string; logo_url: string | null; website_url: string | null; is_featured: boolean; sort_order: number; is_active: boolean; created_at: string
}
export interface TestimonialRow {
  id: string; quote: string; author: string; role: string; company: string; rating: number; avatar_url: string | null; is_featured: boolean; sort_order: number; is_active: boolean; created_at: string
}
export interface TeamRow {
  id: string; name: string; role: string; bio: string | null; avatar_url: string | null; sort_order: number; is_active: boolean; created_at: string
}
export interface PostRow {
  id: string; title: string; slug: string; content: string; summary: string; category: string; image_url: string | null; author: string; reading_time_min: number; is_published: boolean; published_at: string | null; created_at: string
}
export interface JobOpeningRow {
  id: string; title: string; slug: string; location: string; type: string; department: string; description: string; requirements: string[]; is_active: boolean; sort_order: number; created_at: string
}
export interface EnquiryRow {
  id: string; subject: string; name: string; company: string; email: string; phone: string; message: string; status: string; created_at: string
}
export interface AccreditedRow {
  id: string; title: string; description: string | null; image_url: string | null; sort_order: number; is_active: boolean; created_at: string
}
export interface WhyChooseRow {
  id: string; title: string; description: string; icon: string; sort_order: number; is_active: boolean; created_at: string
}
export interface StatsRow {
  id: string; heading: string; subtitle: string; stats: { number: number; suffix: string; label: string }[]; is_active: boolean; created_at: string
}
