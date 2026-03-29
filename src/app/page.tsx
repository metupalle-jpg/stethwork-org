/* eslint-disable @next/next/no-img-element */
const PAYLOAD_URL = process.env.PAYLOAD_CMS_URL || 'https://payload-cms-389848866614.europe-west1.run.app';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string | null;
}

interface HeroBlock {
  blockType: 'hero';
  heading: string;
  subheading: any;
  ctaText: string;
  ctaLink: string;
  image: any;
}

interface FeaturesBlock {
  blockType: 'features';
  heading: string;
  features: Feature[];
}

interface CtaBlock {
  blockType: 'cta';
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  style: string;
}

interface TextImageBlock {
  blockType: 'textImage';
  heading: string;
  description: string;
  layout: string;
}

type Block = HeroBlock | FeaturesBlock | CtaBlock | TextImageBlock;

interface PageData {
  title: string;
  slug: string;
  layout: Block[];
}

async function getPageData(): Promise<PageData | null> {
  try {
    const res = await fetch(
      `${PAYLOAD_URL}/api/landing-pages?where[slug][equals]=stethwork-home&depth=1`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data?.docs?.[0] || null;
  } catch (e) {
    console.error('Failed to fetch CMS data', e);
    return null;
  }
}

interface MediaItem {
  id: number;
  alt: string;
  url: string;
  filename: string;
}

async function getMediaItems(): Promise<MediaItem[]> {
  try {
    const res = await fetch(
      `${PAYLOAD_URL}/api/media?depth=0&limit=20`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data?.docs || [];
  } catch (e) {
    console.error('Failed to fetch media', e);
    return [];
  }
}

function extractText(richText: any): string {
  if (typeof richText === 'string') return richText;
  if (!richText?.root?.children) return '';
  return richText.root.children
    .map((p: any) => p.children?.map((c: any) => c.text).join('') || '')
    .join(' ');
}

const ROLES = [
  'Physicians and Specialists','Nurses (all levels)','Allied Health Professionals',
  'Radiology and Imaging Technicians','Laboratory Technologists','Pharmacists',
  'Health Administrators','Telemedicine Providers','Wellness Coaches and Health Educators','Healthcare Recruiters'
];

const REGIONS = [
  { name:'GCC', emoji:'\u{1F3DB}\uFE0F' },{ name:'India', emoji:'\u{1F1EE}\u{1F1F3}' },
  { name:'UK', emoji:'\u{1F1EC}\u{1F1E7}' },{ name:'Africa', emoji:'\u{1F30D}' },
  { name:'USA', emoji:'\u{1F1FA}\u{1F1F8}' },{ name:'SE Asia', emoji:'\u{1F30F}' }
];

const DEFAULT_FEATURES: Feature[] = [
  {
    id: 'verified-professional-identity',
    title: 'Verified Professional Identity',
    description: 'Trusted digital identity with credential verification',
    icon: 'shield',
  },
  {
    id: 'curated-opportunities',
    title: 'Curated Opportunities',
    description: 'Only relevant jobs matching your specialty',
    icon: 'target',
  },
  {
    id: 'peer-network',
    title: 'Peer Network',
    description: 'Connect with healthcare professionals globally',
    icon: 'users',
  },
  {
    id: 'career-growth',
    title: 'Career Growth',
    description: 'Tools to track and advance your career',
    icon: 'briefcase',
  },
];

type IconName =
  | 'home'
  | 'shield'
  | 'target'
  | 'users'
  | 'briefcase'
  | 'check'
  | 'message'
  | 'globe'
  | 'lock'
  | 'ban'
  | 'star';

function Icon({
  name,
  className = 'w-5 h-5',
  strokeClassName = 'stroke-current',
}: {
  name: IconName;
  className?: string;
  strokeClassName?: string;
}) {
  if (name === 'home') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <path d="M3 10.5L12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <path d="M12 3c2.5 2 5.5 3 8 3v7c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6c2.5 0 5.5-1 8-3Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'target') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.75" />
      </svg>
    );
  }
  if (name === 'users') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <circle cx="9" cy="7.5" r="3.5" />
        <path d="M2.5 20v-1a5.5 5.5 0 0 1 11 0v1" strokeLinecap="round" />
        <path d="M16.5 4.5a3.5 3.5 0 0 1 0 7" strokeLinecap="round" />
        <path d="M21.5 20v-1a4.5 4.5 0 0 0-3.5-4.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'briefcase') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    );
  }
  if (name === 'check') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'message') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4V7a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'globe') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14 14 0 0 0 0 20M12 2a14 14 0 0 1 0 20M2 12h20" />
      </svg>
    );
  }
  if (name === 'lock') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" />
      </svg>
    );
  }
  if (name === 'ban') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M5.5 5.5 18.5 18.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} ${strokeClassName}`} strokeWidth="2">
      <path d="m12 3 2.5 5.5 6 .8-4.5 4.2 1.2 6-5.2-3-5.2 3 1.2-6L3.5 9.3l6-.8L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function Home() {
  const page = await getPageData();
  const media = await getMediaItems();

  const hero = page?.layout?.find((b): b is HeroBlock => b.blockType === 'hero');
  const features = page?.layout?.find((b): b is FeaturesBlock => b.blockType === 'features');
  const cta = page?.layout?.find((b): b is CtaBlock => b.blockType === 'cta');

  const heroHeading = hero?.heading || 'A Smarter Way for Healthcare Experts to Network, Grow, and Get Hired';
  const heroSub = hero ? extractText(hero.subheading) : 'Join a global network of verified healthcare professionals.';
  const heroCtaText = hero?.ctaText || 'Create Your Professional Profile';
  const heroCtaLink = hero?.ctaLink || '/jobseeker-registration';

  // Find media by alt text
  const heroImg = media.find(m => m.alt === 'healthteam1');
  const card1Img = media.find(m => m.alt === 'healthteam5');
  const card2Img = media.find(m => m.alt === 'healthteam2');
  const card3Img = media.find(m => m.alt === 'healthteam3');

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <a href="/" className="flex items-center">
          <img
            src="https://steth.work/Images/logo/Logo-2%201.png"
            alt="Steth.work logo"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </a>
        <div className="flex gap-4 items-center">
          <a href="/" className="text-sm text-gray-700 hover:text-brandTeal inline-flex items-center gap-1">
            <Icon name="home" className="w-4 h-4" />
            Home
          </a>
          <a href="/jobseeker-registration" className="text-sm px-4 py-2 bg-brandTeal text-white rounded-full hover:bg-brandTeal-600 transition">Join Now</a>
          <a href="/jobseeker-login" className="text-sm px-4 py-2 border border-brandTeal text-brandTeal rounded-full hover:bg-brandTeal hover:text-white transition">Sign In</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-steth-hero py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {heroHeading.split('Network, Grow, and Get Hired')[0]}
              <span className="text-brandTeal">Network, Grow, and Get Hired</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">{heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={heroCtaLink} className="px-6 py-3 bg-brandTeal text-white rounded-full font-semibold hover:bg-brandTeal-600 transition">{heroCtaText}</a>
              <a href="/jobseeker-login" className="px-6 py-3 border border-brandTeal text-brandTeal rounded-full font-semibold hover:bg-teal-50 transition">Explore Jobs</a>
            </div>
          </div>
          <div className="relative">
            {heroImg ? (
              <img src={heroImg.url} alt={heroImg.alt} className="rounded-2xl w-full h-80 object-cover shadow-lg" />
            ) : (
              <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center text-gray-400">Healthcare professionals</div>
            )}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-brandTeal">
                <Icon name="shield" className="w-5 h-5" />
              </div>
              <div><p className="font-bold text-sm">Verified Profiles</p><p className="text-xs text-gray-500">Trusted by healthcare employers</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="bg-white py-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {(features?.features?.length ? features.features : DEFAULT_FEATURES).map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-brandTeal text-sm">
                <Icon
                  name={
                    f.icon === 'shield' || f.icon === 'target' || f.icon === 'users' || f.icon === 'briefcase'
                      ? f.icon
                      : 'check'
                  }
                  className="w-4 h-4"
                />
              </div>
              <div><p className="font-bold text-sm text-gray-900">{f.title}</p><p className="text-xs text-gray-500">{f.description}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose <span className="text-brandTeal">Steth.work</span>?</h2>
          <p className="mt-2 text-gray-600">Built exclusively for healthcare professionals by healthcare professionals</p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {card1Img ? (
                <img src={card1Img.url} alt={card1Img.alt} className="h-48 w-full object-cover" />
              ) : (<div className="h-48 bg-gray-200"></div>)}
              <div className="p-6 text-left">
                <h3 className="font-bold text-lg inline-flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-teal-50 text-brandTeal inline-flex items-center justify-center">
                    <Icon name="shield" className="w-4 h-4" />
                  </span>
                  A Trusted Professional Identity for Healthcare
                </h3>
                <p className="mt-2 text-sm text-gray-600">Steth.work verifies your credentials and builds your trusted digital identity that employers value.</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li className="inline-flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-green-600" />Verified profile</li>
                  <li className="inline-flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-green-600" />Work history and credentials</li>
                  <li className="inline-flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-green-600" />Skills and specialty tags</li>
                  <li className="inline-flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-green-600" />Professional reputation scoring</li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {card2Img ? (
                <img src={card2Img.url} alt={card2Img.alt} className="h-48 w-full object-cover" />
              ) : (<div className="h-48 bg-gray-200"></div>)}
              <div className="p-6 text-left">
                <h3 className="font-bold text-lg inline-flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-50 text-green-600 inline-flex items-center justify-center">
                    <Icon name="target" className="w-4 h-4" />
                  </span>
                  Opportunities That Match Your Expertise
                </h3>
                <p className="mt-2 text-sm text-gray-600">Whether you are a doctor, nurse, technician, therapist, or administrator, Steth.work brings the right roles to you.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {card3Img ? (
                <img src={card3Img.url} alt={card3Img.alt} className="h-48 w-full object-cover" />
              ) : (<div className="h-48 bg-gray-200"></div>)}
              <div className="p-6 text-left">
                <h3 className="font-bold text-lg inline-flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 inline-flex items-center justify-center">
                    <Icon name="users" className="w-4 h-4" />
                  </span>
                  Build Your Network, Accelerate Your Career
                </h3>
                <p className="mt-2 text-sm text-gray-600">Healthcare is a team profession. Connect with peers, mentors, organisations, and thought leaders.</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li className="inline-flex items-center gap-2"><Icon name="message" className="w-4 h-4 text-purple-600" />Peer-to-peer messaging</li>
                  <li className="inline-flex items-center gap-2"><Icon name="message" className="w-4 h-4 text-purple-600" />Professional groups by specialty</li>
                  <li className="inline-flex items-center gap-2"><Icon name="message" className="w-4 h-4 text-purple-600" />Case discussions and knowledge-sharing forums</li>
                  <li className="inline-flex items-center gap-2"><Icon name="message" className="w-4 h-4 text-purple-600" />Events and CME opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER MANAGEMENT */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Comprehensive Career Management</h2>
          <p className="text-center text-gray-600 mt-2">For Healthcare Professionals</p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            {['Career Tracker','Continuing Education','Interview Preparation','Salary Benchmarks','International Mobility','Credential Reminders'].map((t,i)=>(
              <div key={i} className="bg-gray-50 rounded-xl p-6 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-teal-50 text-brandTeal inline-flex items-center justify-center">
                  <Icon name="check" className="w-4 h-4" />
                </span>
                <p className="font-bold text-sm text-gray-900">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEALTHCARE ROLES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Healthcare Roles We Serve</h2>
          <p className="mt-2 text-gray-600">Find opportunities across all healthcare specialties and levels</p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {ROLES.map((r,i)=>(
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm text-center">
                <span className="w-8 h-8 rounded-full bg-teal-50 text-brandTeal inline-flex items-center justify-center mb-2">
                  <Icon name="briefcase" className="w-4 h-4" />
                </span>
                <p className="font-bold text-sm text-gray-900">{r}</p>
                <p className="text-xs text-gray-500 mt-1">Discover opportunities tailored to your specialty</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold text-brandTeal uppercase tracking-wider">Global Reach</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">For Healthcare Professionals Everywhere</h2>
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {[{t:'Local Roles',d:'Find opportunities in your current location'},{t:'International Placements',d:'Global career advancement opportunities'},{t:'Remote & Hybrid Telehealth',d:'Work from anywhere flexibility'},{t:'Project-based & Locum',d:'Short-term and flexible engagements'}].map((c,i)=>(
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <div className="inline-flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-brandTeal" />
                  <h3 className="font-bold text-sm">{c.t}</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {REGIONS.map((r,i)=>(<span key={i} className="text-sm text-gray-600">{r.name} {r.emoji}</span>))}
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Data. Your Control.</h2>
          <p className="mt-2 text-gray-600">Complete privacy for healthcare professionals</p>
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {[{t:'Verified Employers',d:'Only authenticated organizations can contact you',icon:'check' as IconName,color:'text-green-600 bg-green-50'},{t:'Privacy Control',d:'Granular settings for profile visibility',icon:'lock' as IconName,color:'text-brandTeal bg-blue-50'},{t:'No Data Sharing',d:'We never sell your information',icon:'ban' as IconName,color:'text-purple-600 bg-purple-50'},{t:'GDPR Compliant',d:'Enterprise security standards',icon:'shield' as IconName,color:'text-amber-600 bg-amber-50'}].map((c,i)=>(
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <span className={`w-8 h-8 rounded-lg inline-flex items-center justify-center mb-3 ${c.color}`}>
                  <Icon name={c.icon} className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-sm">{c.t}</h3>
                <p className="text-xs text-gray-500 mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trusted by Healthcare Professionals</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-left">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Icon key={idx} name="star" className="w-4 h-4" />
                ))}
              </div>
              <p className="text-gray-600 italic">&ldquo;Steth.work helped me find a GCC hospital role within 3 weeks. The verification gave employers confidence immediately.&rdquo;</p>
              <div className="mt-4 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-brandTeal text-white flex items-center justify-center font-bold">K</div><div><p className="font-bold text-sm">Krishna</p><p className="text-xs text-gray-500">Senior Radiographer</p></div></div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 text-left">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Icon key={idx} name="star" className="w-4 h-4" />
                ))}
              </div>
              <p className="text-gray-600 italic">&ldquo;The networking groups are what LinkedIn never gave me, real clinical discussions and real opportunities.&rdquo;</p>
              <div className="mt-4 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-brandTeal text-white flex items-center justify-center font-bold">D</div><div><p className="font-bold text-sm">Dr. Mark Thomas</p><p className="text-xs text-gray-500">General Practitioner</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-steth-cta py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-teal-200 uppercase tracking-wider">Free to Join</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{cta?.heading || 'Ready to Transform Your Healthcare Career?'}</h2>
          <p className="text-teal-100 mt-4">{cta?.description || 'The world of healthcare is shifting fast. Stay connected, stay informed, and stay ahead.'}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={cta?.buttonLink || '/jobseeker-registration'} className="px-6 py-3 bg-white text-brandTeal rounded-full font-semibold hover:bg-gray-100 transition">{cta?.buttonText || 'Create Your Profile'}</a>
            <a href="/jobseeker-login" className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white/10 transition">Browse Opportunities</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-steth-footer py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="https://steth.work/Images/logo/Logo-2-2.png"
              alt="Steth.work logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div>
              <p className="text-white font-bold text-xl">Steth.work</p>
              <p className="text-gray-400 text-sm">Healthcare Professional Network</p>
            </div>
          </div>
          <div className="text-gray-400 text-sm">&copy; Copyright 2025 <span className="text-brandTeal">Steth.work</span> All Rights Reserved.</div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-700 flex flex-wrap justify-center gap-6 text-gray-400 text-xs">
          <span className="inline-flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-green-400" />Verified Healthcare Professionals Only</span>
          <span className="inline-flex items-center gap-2"><Icon name="globe" className="w-4 h-4 text-blue-400" />Global Network</span>
          <span className="inline-flex items-center gap-2"><Icon name="users" className="w-4 h-4 text-purple-400" />50,000+ Members</span>
        </div>
      </footer>
    </div>
  );
}
