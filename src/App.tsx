import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import CountriesPage from './pages/CountriesPage'
import CountryPage from './pages/CountryPage'
import ProgramPage from './pages/ProgramPage'
import WorkVisaPage from './pages/WorkVisaPage'
import StudyVisaPage from './pages/StudyVisaPage'
import ReviewsPage from './pages/ReviewsPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'

const SITE_URL = 'https://siddhivinayakoverseas.com'

function App() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Siddhivinayak Overseas',
    description: 'Work Visa and Study Visa consultancy for Japan, Australia, Canada, UK, Germany, New Zealand, Russia, and USA.',
    url: SITE_URL,
    image: `${SITE_URL}/consultant-office.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    areaServed: [
      'Japan',
      'Australia',
      'Canada',
      'United Kingdom',
      'Germany',
      'New Zealand',
      'Russia',
      'United States',
    ],
    serviceType: ['Work Visa Consulting', 'Study Visa Consulting', 'Immigration Services'],
    sameAs: ['https://www.siddhivinayakoverseas.com'],
  }

  return (
    <>
      <Helmet>
        <title>Siddhivinayak Overseas | Work Visa & Study Visa Consultants</title>
        <meta
          name="description"
          content="Trusted overseas consultancy for Work Visas and Study Visas to Japan, Australia, Canada, UK, Germany, New Zealand, Russia, and the USA. Expert guidance, end-to-end documentation, and proven success rates."
        />
        <meta
          name="keywords"
          content="work visa consultant, study visa consultant, Japan work visa, Australia work visa, Canada work visa, UK work visa, Germany work visa, New Zealand work visa, Russia work visa, USA work visa, overseas consultancy India, Siddhivinayak Overseas, abroad jobs, study abroad consultants, skilled migration visa"
        />
        <meta property="og:title" content="Siddhivinayak Overseas | Work & Study Visas to Japan, Australia, Canada, UK, Germany, NZ, Russia, USA" />
        <meta property="og:description" content="Your gateway to global careers. Trusted Work Visa and Study Visa consultants with end-to-end support across 8+ countries." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/consultant-office.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/countries/:slug" element={<CountryPage />} />
        <Route path="/countries/:slug/programs/:programSlug" element={<ProgramPage />} />
        <Route path="/work-visa" element={<WorkVisaPage />} />
        <Route path="/study-visa" element={<StudyVisaPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </>
  )
}

export default App
