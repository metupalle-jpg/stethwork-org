import fs from 'node:fs'
import path from 'node:path'

type StethworkSeed = {
  siteSettings: {
    siteName: string
    siteTagline?: string
    brand?: {
      primaryAccentHex?: string
      fontStack?: string
      logoLightUrl?: string
      logoDarkUrl?: string
    }
    navigation?: {
      links?: Array<{
        label: string
        url: string
        variant?: 'text' | 'solid' | 'outline'
      }>
    }
    footer?: {
      logoUrl?: string
      brandName?: string
      subtitle?: string
      copyrightText?: string
      copyrightUrl?: string
      legalLinks?: Array<{ label: string; url: string }>
      badges?: Array<{ text: string; icon?: string; iconColorClass?: string }>
    }
  }
  homepage: {
    title: string
    slug: string
    _status?: 'draft' | 'published'
    layout: Array<Record<string, unknown>>
  }
  designTokens?: {
    colors?: {
      brandTeal?: Record<string, string>
      heroGradient?: { from?: string; via?: string; to?: string }
      ctaGradient?: { from?: string; to?: string }
      footerGradient?: { from?: string; to?: string }
    }
    typography?: {
      heroHeadingClass?: string
      sectionHeadingClass?: string
      bodyLargeClass?: string
      bodyClass?: string
    }
    componentStyles?: {
      buttons?: {
        primary?: string
        outline?: string
      }
    }
  }
}

const seedPathFromArg = process.argv[2]
const seedPath = path.resolve(
  process.cwd(),
  seedPathFromArg ?? 'stethwork-payload-seed.json',
)

if (!fs.existsSync(seedPath)) {
  console.error(`Seed file not found: ${seedPath}`)
  process.exit(1)
}

async function run(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const payloadModule = require('payload')
  const payload = payloadModule.default ?? payloadModule

  const parsed = JSON.parse(
    fs.readFileSync(seedPath, 'utf-8'),
  ) as StethworkSeed

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    local: true,
  })

  const designTokens = parsed.designTokens ?? {}
  const brandTeal = designTokens.colors?.brandTeal ?? {}

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: parsed.siteSettings.siteName,
      siteTagline: parsed.siteSettings.siteTagline,
      brand: {
        primaryAccentHex: parsed.siteSettings.brand?.primaryAccentHex ?? '#1CC1C3',
        fontStack: parsed.siteSettings.brand?.fontStack,
        logoLightUrl: parsed.siteSettings.brand?.logoLightUrl,
        logoDarkUrl: parsed.siteSettings.brand?.logoDarkUrl,
      },
      navigation: {
        links:
          parsed.siteSettings.navigation?.links?.map((item) => ({
            label: item.label,
            url: item.url,
            variant: item.variant ?? 'text',
          })) ?? [],
      },
      footer: {
        logoUrl: parsed.siteSettings.footer?.logoUrl,
        brandName: parsed.siteSettings.footer?.brandName,
        subtitle: parsed.siteSettings.footer?.subtitle,
        copyrightText: parsed.siteSettings.footer?.copyrightText,
        copyrightUrl: parsed.siteSettings.footer?.copyrightUrl,
        legalLinks: parsed.siteSettings.footer?.legalLinks ?? [],
        badges: parsed.siteSettings.footer?.badges ?? [],
      },
      designTokens: {
        brandTeal50: brandTeal['50'],
        brandTeal100: brandTeal['100'],
        brandTeal200: brandTeal['200'],
        brandTeal300: brandTeal['300'],
        brandTeal400: brandTeal['400'],
        brandTeal500: brandTeal['500'] ?? '#1CC1C3',
        brandTeal600: brandTeal['600'],
        brandTeal700: brandTeal['700'],
        brandTeal800: brandTeal['800'],
        brandTeal900: brandTeal['900'],
        brandTeal950: brandTeal['950'],
        heroGradientFrom: designTokens.colors?.heroGradient?.from,
        heroGradientVia: designTokens.colors?.heroGradient?.via,
        heroGradientTo: designTokens.colors?.heroGradient?.to,
        ctaGradientFrom: designTokens.colors?.ctaGradient?.from,
        ctaGradientTo: designTokens.colors?.ctaGradient?.to,
        footerGradientFrom: designTokens.colors?.footerGradient?.from,
        footerGradientTo: designTokens.colors?.footerGradient?.to,
        heroHeadingClass: designTokens.typography?.heroHeadingClass,
        sectionHeadingClass: designTokens.typography?.sectionHeadingClass,
        bodyLargeClass: designTokens.typography?.bodyLargeClass,
        bodyClass: designTokens.typography?.bodyClass,
        primaryButtonClass: designTokens.componentStyles?.buttons?.primary,
        outlineButtonClass: designTokens.componentStyles?.buttons?.outline,
      },
    },
  })

  const normalizedLayout = parsed.homepage.layout.map((block) => {
    if (block.blockType !== 'contentSection') return block

    const cards = Array.isArray(block.cards)
      ? (block.cards as Array<Record<string, unknown>>).map((card) => ({
          ...card,
          bullets: Array.isArray(card.bullets)
            ? (card.bullets as string[]).map((label) => ({ label }))
            : card.bullets,
          chips: Array.isArray(card.chips)
            ? (card.chips as string[]).map((label) => ({ label }))
            : card.chips,
        }))
      : block.cards

    const items = Array.isArray(block.items)
      ? (block.items as Array<Record<string, unknown> | string>).map((item) =>
          typeof item === 'string' ? { label: item } : item,
        )
      : block.items

    return {
      ...block,
      cards,
      items,
    }
  })

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: parsed.homepage.slug } },
    limit: 1,
    depth: 0,
  })

  const pageData = {
    title: parsed.homepage.title,
    slug: parsed.homepage.slug,
    layout: normalizedLayout,
    _status: parsed.homepage._status ?? 'published',
  }

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: pageData,
    })
    console.log(`Updated page "${parsed.homepage.slug}"`)
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData,
    })
    console.log(`Created page "${parsed.homepage.slug}"`)
  }

  console.log('Steth.work seed completed successfully.')
  process.exit(0)
}

run().catch((error) => {
  console.error('Failed to seed Steth.work content')
  console.error(error)
  process.exit(1)
})
