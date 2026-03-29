import type { Block, CollectionConfig, GlobalConfig } from 'payload'

const linkFields = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    required: true,
  },
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'text',
    options: [
      { label: 'Text', value: 'text' },
      { label: 'Solid', value: 'solid' },
      { label: 'Outline', value: 'outline' },
    ],
  },
] as const

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Hero Blocks' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'highlightText', type: 'text' },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'primaryCta',
      type: 'group',
      fields: linkFields as any,
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: linkFields as any,
    },
    { name: 'heroImageUrl', type: 'text' },
    { name: 'heroImageAlt', type: 'text' },
    { name: 'trustBadgeTitle', type: 'text' },
    { name: 'trustBadgeDescription', type: 'text' },
  ],
}

export const FeaturesStripBlock: Block = {
  slug: 'featuresStrip',
  interfaceName: 'FeaturesStripBlock',
  labels: { singular: 'Features Strip', plural: 'Features Strips' },
  fields: [
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'text' },
      ],
    },
  ],
}

export const ContentSectionBlock: Block = {
  slug: 'contentSection',
  interfaceName: 'ContentSectionBlock',
  labels: { singular: 'Content Section', plural: 'Content Sections' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      required: true,
      options: [
        { label: 'Why Choose', value: 'why-choose' },
        { label: 'Career Management', value: 'career-management' },
        { label: 'Generic', value: 'generic' },
      ],
    },
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'imageUrl', type: 'text' },
        { name: 'imageAlt', type: 'text' },
        { name: 'icon', type: 'text' },
        {
          name: 'bullets',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true }],
        },
        { name: 'chipsHeading', type: 'text' },
        {
          name: 'chips',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}

export const RolesGridBlock: Block = {
  slug: 'rolesGrid',
  interfaceName: 'RolesGridBlock',
  labels: { singular: 'Roles Grid', plural: 'Roles Grids' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'roles',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

export const GlobalReachBlock: Block = {
  slug: 'globalReach',
  interfaceName: 'GlobalReachBlock',
  labels: { singular: 'Global Reach', plural: 'Global Reach Blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'opportunities',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'coverageTitle', type: 'text' },
    { name: 'coverageDescription', type: 'text' },
    {
      name: 'regions',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'flag', type: 'text' },
      ],
    },
  ],
}

export const PrivacySectionBlock: Block = {
  slug: 'privacySection',
  interfaceName: 'PrivacySectionBlock',
  labels: { singular: 'Privacy Section', plural: 'Privacy Sections' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'body', type: 'textarea' },
    { name: 'imageUrl', type: 'text' },
    { name: 'imageAlt', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials Blocks' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'initial', type: 'text' },
        { name: 'rating', type: 'number', defaultValue: 5 },
      ],
    },
  ],
}

export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  interfaceName: 'CTASectionBlock',
  labels: { singular: 'CTA Section', plural: 'CTA Sections' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'primaryCta',
      type: 'group',
      fields: linkFields as any,
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: linkFields as any,
    },
    { name: 'signinPanelTitle', type: 'text' },
    { name: 'signinPanelSubtitle', type: 'text' },
    { name: 'googleSigninLabel', type: 'text' },
    { name: 'emailSigninLabel', type: 'text' },
    { name: 'emailSigninUrl', type: 'text' },
    { name: 'legalText', type: 'textarea' },
  ],
}

export const StethworkBlocks: Block[] = [
  HeroBlock,
  FeaturesStripBlock,
  ContentSectionBlock,
  RolesGridBlock,
  GlobalReachBlock,
  PrivacySectionBlock,
  TestimonialsBlock,
  CTASectionBlock,
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: StethworkBlocks,
    },
  ],
  versions: {
    drafts: true,
  },
}

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
        height: 180,
        fit: 'cover',
      },
      {
        name: 'card',
        width: 640,
        height: 360,
        fit: 'cover',
      },
      {
        name: 'hero',
        width: 1600,
        height: 900,
        fit: 'cover',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    { name: 'siteName', type: 'text', required: true },
    { name: 'siteTagline', type: 'text' },
    {
      name: 'brand',
      type: 'group',
      fields: [
        { name: 'primaryAccentHex', type: 'text', defaultValue: '#1CC1C3' },
        { name: 'fontStack', type: 'textarea' },
        { name: 'logoLightUrl', type: 'text' },
        { name: 'logoDarkUrl', type: 'text' },
      ],
    },
    {
      name: 'navigation',
      type: 'group',
      fields: [
        {
          name: 'links',
          type: 'array',
          fields: linkFields as any,
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'logoUrl', type: 'text' },
        { name: 'brandName', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'copyrightText', type: 'text' },
        { name: 'copyrightUrl', type: 'text' },
        {
          name: 'legalLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
        {
          name: 'badges',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'icon', type: 'text' },
            { name: 'iconColorClass', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'designTokens',
      type: 'group',
      fields: [
        { name: 'brandTeal50', type: 'text', defaultValue: '#ecfdfd' },
        { name: 'brandTeal100', type: 'text', defaultValue: '#cffaf9' },
        { name: 'brandTeal200', type: 'text', defaultValue: '#a0f3f1' },
        { name: 'brandTeal300', type: 'text', defaultValue: '#67e8e6' },
        { name: 'brandTeal400', type: 'text', defaultValue: '#2dd4d7' },
        { name: 'brandTeal500', type: 'text', defaultValue: '#1CC1C3' },
        { name: 'brandTeal600', type: 'text', defaultValue: '#179fa3' },
        { name: 'brandTeal700', type: 'text', defaultValue: '#147f83' },
        { name: 'brandTeal800', type: 'text', defaultValue: '#155f63' },
        { name: 'brandTeal900', type: 'text', defaultValue: '#164f52' },
        { name: 'brandTeal950', type: 'text', defaultValue: '#052c2f' },
        { name: 'heroGradientFrom', type: 'text', defaultValue: '#eff6ff' },
        { name: 'heroGradientVia', type: 'text', defaultValue: '#ffffff' },
        { name: 'heroGradientTo', type: 'text', defaultValue: '#f0fdfa' },
        { name: 'ctaGradientFrom', type: 'text', defaultValue: '#1e40af' },
        { name: 'ctaGradientTo', type: 'text', defaultValue: '#0f766e' },
        { name: 'footerGradientFrom', type: 'text', defaultValue: '#1e293b' },
        { name: 'footerGradientTo', type: 'text', defaultValue: '#0f172a' },
        { name: 'heroHeadingClass', type: 'text' },
        { name: 'sectionHeadingClass', type: 'text' },
        { name: 'bodyLargeClass', type: 'text' },
        { name: 'bodyClass', type: 'text' },
        { name: 'primaryButtonClass', type: 'textarea' },
        { name: 'outlineButtonClass', type: 'textarea' },
      ],
    },
  ],
}

export const stethworkCollections: CollectionConfig[] = [Pages, Media]
export const stethworkGlobals: GlobalConfig[] = [SiteSettings]

