import Hero from '@/components/home/Hero'
import Industries from '@/components/home/Industries'
import ServicesSection from '@/components/home/ServicesSection'
import WhyChoose from '@/components/home/WhyChoose'
import FuturePlatform from '@/components/home/FuturePlatform'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ProductCategories from '@/components/home/ProductCategories'
import Certifications from '@/components/home/Certifications'
import Clients from '@/components/home/Clients'
import Testimonials from '@/components/home/Testimonials'
import ContactCTA from '@/components/home/ContactCTA'
import {
  getIndustries,
  getServices,
  getWhyChoose,
  getFeaturedProjects,
  getCategories,
  getCertifications,
  getClients,
  getTestimonials,
  getStats,
} from '@/lib/cms'

export default async function HomePage() {
  const [industries, services, whyChoose, projects, categories, certifications, clients, testimonials, stats] =
    await Promise.all([
      getIndustries(),
      getServices(),
      getWhyChoose(),
      getFeaturedProjects(),
      getCategories(),
      getCertifications(),
      getClients(),
      getTestimonials(),
      getStats(),
    ])

  const totalProjects = industries.reduce((sum, i) => sum + i.project_count, 0)

  return (
    <>
      <Hero projectCount={totalProjects} />
      <Certifications certifications={certifications} />
      <Industries industries={industries} />
      <ServicesSection services={services} featuredOnly />
      <WhyChoose items={whyChoose} stats={stats} />
      <FuturePlatform />
      <FeaturedProjects projects={projects} />
      <ProductCategories categories={categories} />
      <Clients clients={clients} />
      <Testimonials testimonials={testimonials} />
      <ContactCTA />
    </>
  )
}
