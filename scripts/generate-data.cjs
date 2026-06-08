const fs = require('node:fs');
const path = require('node:path');

const sourcePath =
  'C:\\Users\\Silent Shadow\\.codex\\attachments\\bf9b602a-3ec2-430d-a8dd-cd0698c8c5d0\\pasted-text.txt';
const outputDir = path.join(process.cwd(), 'src', 'data');

const icons = [
  'Sparkles',
  'GraduationCap',
  'Code2',
  'Palette',
  'CheckSquare',
  'BriefcaseBusiness',
  'BadgeCheck',
  'ShoppingBag',
  'UsersRound',
  'PlayCircle',
  'Newspaper',
  'WalletCards',
  'HeartPulse',
  'Plane',
  'Trophy',
  'Landmark',
  'BookOpen',
  'Utensils',
  'Building2',
  'Wifi',
  'Car',
  'Shirt',
  'ReceiptText',
  'Radio',
  'Microscope',
  'ShieldCheck',
  'HandHeart',
  'Wheat',
  'Scale',
  'HeartHandshake',
  'CloudSun',
  'Baby',
  'Rocket',
  'Camera',
  'Box',
];

const categoryDescriptions = {
  'ai-tools': 'AI assistants, generators, copilots, and machine learning platforms.',
  'education-learning': 'Courses, classrooms, coding lessons, and skill-building resources.',
  'developer-tools': 'Tools for coding, deploying, debugging, APIs, and developer workflows.',
  'design-creative': 'Design, creative assets, typography, inspiration, and visual editing tools.',
  'productivity-tools': 'Planning, collaboration, meetings, notes, and daily workflow utilities.',
  'freelancing-remote-work': 'Freelance marketplaces and remote work boards for global talent.',
  'jobs-careers': 'Career platforms, salary research, and job discovery websites.',
  'e-commerce-shopping': 'Online shopping, marketplaces, retail, and seller platforms.',
  'social-media-communities': 'Social networks, communities, forums, and creator platforms.',
  'entertainment-streaming': 'Video, music, livestreaming, entertainment, and media platforms.',
  'news-media': 'Global and Pakistani news, journalism, business, and media sources.',
  'finance-banking': 'Payments, banks, crypto, markets, and personal finance resources.',
  'health-medical': 'Medical reference, appointment, pharmacy, and health education websites.',
  'travel-tourism': 'Flights, hotels, travel planning, tourism, and trip research tools.',
  'sports-cricket': 'Sports coverage, cricket scores, leagues, statistics, and official bodies.',
  'government-official-pakistan': 'Official Pakistan government, public service, and regulatory websites.',
  'islamic-religious': 'Islamic learning, Quran, hadith, prayer, and religious guidance resources.',
  'food-delivery': 'Food delivery, restaurants, recipes, cooking, and food media.',
  'real-estate': 'Property listings, real estate research, and housing marketplaces.',
  'telecom-internet-pakistan': 'Pakistan telecom, internet providers, and communications authorities.',
  'automobiles-cars': 'Vehicle listings, car research, auto marketplaces, and manufacturer sites.',
  'fashion-clothing': 'Fashion brands, apparel shopping, and style marketplaces.',
  'utilities-bill-payment': 'Electricity, gas, bill payment, and Pakistan utility services.',
  'tech-news-blogs': 'Technology news, gadgets, startups, engineering, and industry blogs.',
  'research-science': 'Research databases, science publishers, academic search, and open knowledge.',
  'cybersecurity-privacy': 'Security tools, privacy services, breach checks, and cyber learning.',
  'ngo-social-work': 'Nonprofits, humanitarian work, social impact, and donation platforms.',
  'agriculture-farming': 'Agriculture research, farming, rural development, and crop resources.',
  'legal-law': 'Legal information, courts, law research, and professional legal platforms.',
  matrimonial: 'Matrimonial, marriage, and relationship platforms.',
  'weather-environment': 'Weather forecasts, climate, air quality, and environment monitoring.',
  'kids-education-children': 'Child-friendly learning, games, coding, and educational websites.',
  'business-entrepreneurship': 'Startup, business, entrepreneurship, and investment resources.',
  'photography-video': 'Photo, video, stock media, camera, and editing resources.',
  'miscellaneous-useful': 'Everyday useful tools for files, translation, time, links, and quick tasks.',
};

const colorPairs = [
  ['#e50914', 'from-red-500 to-pink-500'],
  ['#ff2d78', 'from-pink-500 to-rose-500'],
  ['#7c3aed', 'from-violet-500 to-indigo-500'],
  ['#06b6d4', 'from-cyan-500 to-sky-500'],
  ['#10b981', 'from-emerald-500 to-teal-500'],
  ['#f59e0b', 'from-amber-500 to-orange-500'],
  ['#3b82f6', 'from-blue-500 to-cyan-500'],
];

const pakistaniHints = [
  '.pk',
  'pakistan',
  'pakistani',
  'gcuf',
  'jazzcash',
  'easypaisa',
  'rozee',
  'mustakbil',
  'zameen',
  'graana',
  'khaadi',
  'gulahmed',
  'sapphire',
  'nadra',
  'fbr',
  'hec',
  'pcb',
  'pmd',
  'ndma',
  'lesco',
  'mepco',
  'iesco',
  'ssgc',
  'sngpl',
  'ke.com.pk',
  'pakwheels',
  'suzukipakistan',
  'hondaatlas',
  'toyota.com.pk',
  'kia.com.pk',
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function domainFromUrl(url) {
  return new URL(url).hostname.replace(/^www\./, '');
}

function isFreeCell(cell) {
  if (!cell) return true;
  return !/❌|âŒ|no|paid/i.test(cell);
}

function readDocumentation() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Documentation attachment not found: ${sourcePath}`);
  }
  return fs.readFileSync(sourcePath, 'utf8');
}

function parseTables(markdown) {
  const section = markdown.split(/^## 17\. Future Roadmap/m)[0].split(/^## 16\./m)[1];
  const blocks = section
    .split(/\r?\n(?=####\s+\d+\.\s+)/)
    .filter((block) => /^####\s+\d+\.\s+/m.test(block));

  return blocks.map((block, categoryIndex) => {
    const heading = block.match(/^####\s+\d+\.\s+([^\r\n]+)/m);
    if (!heading) throw new Error(`Missing category heading in block ${categoryIndex + 1}`);
    const label = heading[1].trim();
    const slug = slugify(label);
    const rows = block
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith('|') && !line.includes('---') && !line.includes('Website | URL'))
      .map((line, websiteIndex) => {
        const cells = line
          .split('|')
          .map((cell) => cell.trim())
          .filter(Boolean);
        const name = cells[0];
        const url = cells[1];
        const domain = domainFromUrl(url);
        const isPakistani = pakistaniHints.some((hint) =>
          `${name} ${url} ${domain}`.toLowerCase().includes(hint),
        );
        const ratingSeed = ((categoryIndex + 2) * 17 + websiteIndex * 7) % 18;
        const votes = 90 + ((categoryIndex + 1) * 137 + websiteIndex * 53) % 1400;
        const rating = Number((3.6 + ratingSeed / 12).toFixed(1));
        const isNew = websiteIndex >= 12 || (categoryIndex + websiteIndex) % 19 === 0;
        const isTrending = websiteIndex < 3 || (websiteIndex + categoryIndex) % 8 === 0;
        const isPopular = votes > 500 || websiteIndex < 5;
        const isFree = isFreeCell(cells[2]);
        const tags = [
          isFree ? 'Free' : 'Paid',
          'Verified',
          isPopular ? 'Popular' : '',
          isNew ? 'New' : '',
          isTrending ? 'Trending' : '',
          isPakistani ? 'Pakistani' : '',
          slug.includes('ai') ? 'AI-Powered' : '',
          rating >= 4.7 ? 'Top Rated' : '',
        ].filter(Boolean);

        return {
          id: `${slug}-${websiteIndex + 1}-${slugify(name)}`,
          name,
          description: `${name} is a trusted ${label.toLowerCase()} resource for discovering useful services, tools, and information.`,
          url,
          favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
          screenshot: `https://image.thum.io/get/width/900/crop/700/noanimate/${encodeURIComponent(url)}`,
          category: slug,
          tags,
          rating,
          votes,
          isVerified: url.startsWith('https://'),
          isPopular,
          isFree,
          isPakistani,
          isNew,
          isTrending,
          isFeatured: websiteIndex < 2 || (categoryIndex + websiteIndex) % 17 === 0,
          region: isPakistani ? 'pakistan' : domain.endsWith('.uk') ? 'uk' : domain.endsWith('.in') ? 'india' : 'worldwide',
          addedDate: new Date(Date.UTC(2026, (categoryIndex + websiteIndex) % 6, 1 + ((categoryIndex * 3 + websiteIndex) % 27)))
            .toISOString()
            .slice(0, 10),
          clicks: 200 + ((categoryIndex + 5) * 211 + websiteIndex * 97) % 9000,
        };
      });

    const [color, gradient] = colorPairs[categoryIndex % colorPairs.length];
    return {
      category: {
        slug,
        label,
        description: categoryDescriptions[slug] || `Curated websites for ${label.toLowerCase()}.`,
        icon: icons[categoryIndex] || 'Globe2',
        color,
        gradient,
        websiteCount: rows.length,
      },
      rows,
    };
  });
}

function main() {
  const markdown = readDocumentation();
  const parsed = parseTables(markdown);
  const categories = parsed.map((item) => item.category);
  const websites = parsed.flatMap((item) => item.rows);
  const featured = {
    heroTags: ['YouTube', 'Canva', 'ChatGPT', 'Notion', 'Upwork', 'GitHub', 'Khan Academy'],
    popularIds: [...websites].sort((a, b) => b.clicks - a.clicks).slice(0, 18).map((site) => site.id),
    trendingIds: websites.filter((site) => site.isTrending).slice(0, 20).map((site) => site.id),
    newIds: [...websites].sort((a, b) => b.addedDate.localeCompare(a.addedDate)).slice(0, 20).map((site) => site.id),
    featuredIds: websites.filter((site) => site.isFeatured).slice(0, 24).map((site) => site.id),
  };

  if (categories.length !== 35) throw new Error(`Expected 35 categories, got ${categories.length}`);
  if (websites.length < 500) throw new Error(`Expected 500+ websites, got ${websites.length}`);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'categories.json'), `${JSON.stringify(categories, null, 2)}\n`);
  fs.writeFileSync(path.join(outputDir, 'websites.json'), `${JSON.stringify(websites, null, 2)}\n`);
  fs.writeFileSync(path.join(outputDir, 'featured.json'), `${JSON.stringify(featured, null, 2)}\n`);
  console.log(`Generated ${categories.length} categories and ${websites.length} websites.`);
}

main();
