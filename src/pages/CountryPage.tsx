import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import {
  Globe2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Sun,
  Building2,
  Languages,
  TrendingUp,
  Bookmark,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
)

export default function CountryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [country, setCountry] = useState<any>(null)
  const [programs, setPrograms] = useState<any[]>([])
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCountryData() {
      if (!slug) return

      try {
        // Fetch country
        const { data: countryData } = await supabase
          .from('countries')
          .select('*')
          .eq('slug', slug)
          .single()

        if (!countryData) {
          setLoading(false)
          return
        }

        setCountry(countryData)

        // Fetch programs
        const { data: programsData } = await supabase
          .from('public_visa_programs')
          .select('*')
          .eq('country_id', countryData.id)
          .order('sort_order', { ascending: true })

        setPrograms(programsData || [])

        // Fetch FAQs
        const { data: faqsData } = await supabase
          .from('country_faqs')
          .select('*')
          .eq('country_id', countryData.id)
          .order('sort_order', { ascending: true })

        setFaqs(faqsData || [])
      } catch (error) {
        console.error('Error fetching country data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCountryData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-semibold text-foreground">Country not found</h1>
          <Button asChild className="mt-4">
            <Link to="/countries">Back to Countries</Link>
          </Button>
        </div>
      </div>
    )
  }

  const visaStats = country.visa_stats && typeof country.visa_stats === 'object' && !Array.isArray(country.visa_stats) ? country.visa_stats as Record<string, any> : {}
  const costOfLiving = country.cost_of_living && typeof country.cost_of_living === 'object' && !Array.isArray(country.cost_of_living) ? country.cost_of_living as Record<string, any> : {}

  return (
    <>
      <Helmet>
        <title>{country.meta_title || `${country.name} Visa | Siddhivinayak Overseas`}</title>
        <meta
          name="description"
          content={country.meta_desc || `Work and study visa options for ${country.name}. Expert guidance and end-to-end support.`}
        />
      </Helmet>
      <SiteHeader />
      <main className="min-h-screen bg-background premium-page">
        {/* Breadcrumb + Header */}
        <section className="border-b border-border/40 px-4 py-8 md:px-6 md:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/countries" className="hover:text-primary">Countries</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{country.name}</span>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-5xl">{country.flag_emoji}</span>
                  <div>
                    <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                      {country.name}
                    </h1>
                    <p className="text-muted-foreground">{country.capital} · {country.region}</p>
                  </div>
                </div>
                <p className="max-w-2xl text-muted-foreground md:text-lg">
                  {country.description}
                </p>
              </div>
              <Button asChild className="btn-glow rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                <Link to={`/contact?country=${country.slug}`}>
                  Apply for {country.name} Visa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-border/40 px-4 py-6 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {visaStats.success_rate && (
                <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <TrendingUp className="mb-2 h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{visaStats.success_rate}%</p>
                  <p className="text-xs text-muted-foreground">Visa Success Rate</p>
                </div>
              )}
              {visaStats.avg_processing_days && (
                <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <Clock className="mb-2 h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{visaStats.avg_processing_days}d</p>
                  <p className="text-xs text-muted-foreground">Avg. Processing</p>
                </div>
              )}
              {costOfLiving.monthly_single && (
                <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <DollarSign className="mb-2 h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">₹{(costOfLiving.monthly_single / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-muted-foreground">Monthly Living Cost</p>
                </div>
              )}
              {country.language && (
                <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                  <Languages className="mb-2 h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold text-foreground">{country.language.split(",")[0]}</p>
                  <p className="text-xs text-muted-foreground">Primary Language</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Work / Why Study / Lifestyle */}
        <section className="px-4 py-12 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {country.why_work && (
                <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                  <Briefcase className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-3 font-serif text-xl font-semibold">Why Work Here</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{country.why_work}</p>
                </div>
              )}
              {country.why_study && (
                <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                  <GraduationCap className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-3 font-serif text-xl font-semibold">Why Study Here</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{country.why_study}</p>
                </div>
              )}
              {country.lifestyle && (
                <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                  <Sun className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-3 font-serif text-xl font-semibold">Lifestyle</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{country.lifestyle}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Visa Programs */}
        <section className="border-t border-border/40 px-4 py-12 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Available Visa Programs
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {programs?.map((program) => (
                <div
                  key={program.id}
                  className="group rounded-2xl border border-border/60 bg-card/50 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {program.program_type.replace("_", " ").toUpperCase()}
                      </span>
                      <h3 className="mt-2 font-serif text-lg font-semibold text-foreground group-hover:text-primary transition">
                        {program.name}
                      </h3>
                    </div>
                    <span className="text-2xl">{country.flag_emoji}</span>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {program.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {program.processing_time && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {program.processing_time}
                      </span>
                    )}
                    {program.visa_duration && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                        <Bookmark className="h-3 w-3" />
                        {program.visa_duration}
                      </span>
                    )}
                    {program.pathway_to_pr && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" />
                        PR Pathway
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {program.cost_inr && (
                      <p className="text-sm font-semibold text-foreground">
                        From ₹{program.cost_inr.toLocaleString()}
                      </p>
                    )}
                    <Link
                      to={`/countries/${country.slug}/programs/${program.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:gap-2"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <section className="border-t border-border/40 px-4 py-12 md:px-6 md:py-20">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="rounded-xl border border-border/60 bg-card/50 p-5"
                  >
                    <h3 className="mb-2 font-medium text-foreground">{faq.question}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-4 pb-20 md:px-6">
          <div className="mx-auto max-w-3xl rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center md:p-12">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Ready to move to {country.name}?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our consultants specialize in {country.name} visa applications. Book your free consultation today.
            </p>
            <Button asChild className="mt-6 btn-glow rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to={`/contact?country=${country.slug}`}>
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
