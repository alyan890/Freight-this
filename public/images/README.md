# Image Assets for FreightThis

## Current Images (Using Unsplash)

### Hero Section
- **Background**: Freight trucks on highway
- **URL**: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d`

### Solutions Section - Freight Version

**Driver Placement Card**
- **Image**: Professional truck driver
- **URL**: `https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55`

**Fleet Management Card**
- **Image**: Fleet of trucks/logistics
- **URL**: `https://images.unsplash.com/photo-1601584115197-04ecc0da31d7`

**Custom Solutions Card**
- **Image**: Warehouse/logistics planning
- **URL**: `https://images.unsplash.com/photo-1578575437130-527eed3abbec`

### Leadership Section
- **Bob Houston Photo**: Professional businessman
- **URL**: `https://images.unsplash.com/photo-1560250097-0b93528c311a`
- **Note**: Replace with actual Bob Houston photo

### CTA Section
- **Background**: Highway freight scene
- **URL**: `https://images.unsplash.com/photo-1519003722824-194d4455a60c`

## To Replace Images

1. Add your custom images to `/public/images/`
2. Update the component files:
   - `components/HeroSection.tsx`
   - `components/SolutionsSectionFreight.tsx`
   - `components/LeadershipSection.tsx`
   - `components/CTASection.tsx`

3. Replace URL with local path:
   ```tsx
   // From:
   backgroundImage: 'url(https://images.unsplash.com/...)'
   
   // To:
   backgroundImage: 'url(/images/your-image.jpg)'
   ```

## Recommended Image Sizes

- **Hero background**: 1920x1080 or larger
- **Solution cards**: 600x400 (landscape)
- **Leadership photo**: 800x800 (square)
- **CTA background**: 1920x1080 or larger

## Image Optimization

For best performance, optimize images before adding:
- Use WebP format when possible
- Compress images (80-85% quality)
- Use Next.js Image component for automatic optimization
