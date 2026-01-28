# Complete Design Prompt for BRIDA Jatim Innovation Dashboard

## Project Overview
Create a modern, professional web dashboard for **BRIDA Jatim (Badan Riset dan Inovasi Daerah Provinsi Jawa Timur)** - a regional research and innovation agency for East Java Province, Indonesia. The dashboard displays innovation data through interactive visualizations, AI-powered insights, and collaborative recommendations across government agencies (OPD) and regional areas.

---

## 1. OVERALL DESIGN STYLE & VISUAL IDENTITY

### Design Philosophy
- **Modern Government Dashboard**: Clean, professional, data-centric design suitable for Indonesian government institutions
- **Visual Hierarchy**: Clear information architecture with emphasis on data visualization and statistics
- **Accessibility**: High contrast, readable typography, intuitive navigation
- **Responsive**: Fully responsive from mobile (320px) to desktop (1920px+)
- **Professional & Trustworthy**: Conveys authority and reliability while remaining modern and user-friendly

### Visual Mood
- Clean and minimalist with subtle shadows and rounded corners
- Data-driven with vibrant charts and statistics
- Welcoming yet professional government aesthetic
- Modern glassmorphism effects (backdrop blur) on headers
- Smooth transitions and micro-animations throughout

---

## 2. COLOR PALETTE

### Primary Colors
- **Primary Blue**: `#2563EB` (RGB: 37, 99, 235)
  - Use for: Primary buttons, active states, links, primary accents, logo elements
  - Gradient variant: `linear-gradient(to right, #2563EB, #1D4ED8)`
  
- **Dark Primary Blue**: `#1D4ED8` (RGB: 29, 78, 216)
  - Use for: Button hover states, darker accent elements

### Background Colors (Light Mode)
- **Main Background**: `#F8FAFC` (RGB: 248, 250, 252) - Slate 50
- **Card/Surface Background**: `#FFFFFF` (White)
- **Landing Page Background**: `linear-gradient(to bottom right, #EFF6FF, #FFFFFF)` - Blue 50 to White
- **Footer Background**: `#2563EB` (Primary Blue)

### Background Colors (Dark Mode)
- **Main Background**: `#111827` (RGB: 17, 24, 39) - Gray 900
- **Card/Surface Background**: `#1F2937` (RGB: 31, 41, 55) - Gray 800
- **Sidebar/Header Background**: `#1F2937` (Gray 800)
- **Footer Background**: `#1F2937` (Gray 800)
- **Hover States**: `#374151` (Gray 700)

### Text Colors (Light Mode)
- **Primary Text**: `#0F172A` (RGB: 15, 23, 42) - Slate 900
- **Secondary Text**: `#64748B` (RGB: 100, 116, 139) - Slate 500
- **Muted Text**: `#94A3B8` (RGB: 148, 163, 184) - Slate 400
- **Link/Interactive Text**: `#2563EB` (Primary Blue)

### Text Colors (Dark Mode)
- **Primary Text**: `#FFFFFF` (White)
- **Secondary Text**: `#D1D5DB` (RGB: 209, 213, 219) - Gray 300
- **Muted Text**: `#9CA3AF` (RGB: 156, 163, 175) - Gray 400

### Status & Semantic Colors
- **Success/Green**: `#10B981` (RGB: 16, 185, 129) - Emerald 500
  - Use for: Success states, positive metrics, "Active" badges
  
- **Warning/Yellow**: `#F59E0B` (RGB: 245, 158, 11) - Amber 500
  - Use for: Warning states, pending actions, caution indicators
  
- **Error/Red**: `#EF4444` (RGB: 239, 68, 68) - Red 500
  - Use for: Error messages, delete actions, critical alerts
  
- **Info/Purple**: `#8B5CF6` (RGB: 139, 92, 246) - Violet 500
  - Use for: Info indicators, secondary highlights
  
- **Orange Accent**: `#F97316` (RGB: 249, 115, 22) - Orange 500
  - Use for: Additional data visualizations

### Chart Colors
- **Chart Line 1 (Digital)**: `#2563EB` (Primary Blue)
- **Chart Line 2 (Non-Digital)**: `#10B981` (Green)
- **Chart Line 3 (Technology)**: `#F59E0B` (Amber)
- **Chart Bar**: `#2563EB` (Primary Blue)
- **Chart Pie Segment 1**: `#6366F1` (Indigo 500)
- **Chart Pie Segment 2**: `#10B981` (Green)

### Border & Shadow Colors (Light Mode)
- **Border**: `#E5E7EB` (RGB: 229, 231, 235) - Gray 200
- **Subtle Border**: `#F3F4F6` (RGB: 243, 244, 246) - Gray 100
- **Shadow**: `rgba(0, 0, 0, 0.1)` for elevation
- **Heavy Shadow**: `rgba(0, 0, 0, 0.25)` for modals/popovers

### Border & Shadow Colors (Dark Mode)
- **Border**: `#374151` (Gray 700)
- **Subtle Border**: `#4B5563` (Gray 600)

---

## 3. TYPOGRAPHY SYSTEM

### Font Family
- **Primary Font**: System font stack with fallbacks
  - `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  - Clean, readable, and performs well across all platforms

### Font Sizes & Line Heights
- **Hero/Display (Landing Page H1)**: 
  - Desktop: `3.75rem` (60px), `font-weight: 700` (bold)
  - Mobile: `2.25rem` (36px), `font-weight: 700`
  - Line height: `1.1`
  
- **Page Heading (H1)**: 
  - Desktop: `1.875rem` (30px), `font-weight: 700`
  - Mobile: `1.5rem` (24px), `font-weight: 700`
  - Line height: `1.2`
  
- **Section Heading (H2)**: 
  - Desktop: `1.5rem` (24px), `font-weight: 700`
  - Mobile: `1.25rem` (20px), `font-weight: 700`
  - Line height: `1.3`
  
- **Card/Component Heading (H3)**: 
  - Desktop: `1.125rem` (18px), `font-weight: 700`
  - Mobile: `1rem` (16px), `font-weight: 700`
  - Line height: `1.4`
  
- **Body Large**: 
  - `1.25rem` (20px), `font-weight: 400`
  - Use for: Landing page descriptions
  
- **Body**: 
  - `1rem` (16px), `font-weight: 400`
  - Use for: General content, descriptions
  
- **Body Small**: 
  - `0.875rem` (14px), `font-weight: 400`
  - Use for: Metadata, secondary information
  
- **Caption/Tiny**: 
  - `0.75rem` (12px), `font-weight: 400`
  - Use for: Chart labels, footnotes, copyright

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Buttons, labels, navigation
- **Semi-Bold**: 600 - Subheadings
- **Bold**: 700 - Headings, emphasis

### Text Styling Guidelines
- **Headings**: Always bold (700), tight letter-spacing
- **Body Text**: Regular (400), generous line-height (1.5-1.75) for readability
- **Interactive Elements** (buttons, links): Medium (500)
- **Statistics/Numbers**: Bold (700), larger size for emphasis

---

## 4. LAYOUT SYSTEM & GRID

### Overall Dashboard Layout Structure
```
┌─────────────────────────────────────────────┐
│            FIXED HEADER (56-60px)           │
├──────────┬──────────────────────────────────┤
│          │                                  │
│  FIXED   │         MAIN CONTENT             │
│ SIDEBAR  │         (Scrollable)             │
│ (256px)  │                                  │
│          │                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
            │         FOOTER                  │
            └─────────────────────────────────┘
```

### Header
- **Position**: Fixed top, full width, z-index 50
- **Height**: 
  - Mobile: `56px` (py-1.5)
  - Desktop: `60px` (py-2)
- **Structure**: 
  - Left: Hamburger menu button + BRIDA Logo
  - Right: Dark mode toggle + User profile menu
- **Background**: 
  - Light mode: White with shadow
  - Dark mode: Gray 800 with shadow
- **Shadow**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **Glassmorphism**: On landing page - `bg-white/90 backdrop-blur-sm`

### Sidebar (Dashboard Pages Only)
- **Width**: `256px` (w-64) when open, `0px` when collapsed
- **Position**: Fixed left, below header
- **Height**: `calc(100vh - 56px)` on mobile, `calc(100vh - 60px)` on desktop
- **Background**: 
  - Light mode: White
  - Dark mode: Gray 800
- **Shadow**: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`
- **Transition**: `all 300ms ease-in-out`
- **Content Padding**: `16px` (p-4)
- **Navigation Items**:
  - Height: `48px` (py-3)
  - Padding: `16px` horizontal (px-4)
  - Border radius: `8px` (rounded-lg)
  - Gap between icon and text: `12px` (gap-3)
  - Active state: Primary Blue background, white text
  - Hover state (inactive): Gray 100 (light) / Gray 700 (dark)

### Main Content Area
- **Margin Left**: 
  - Mobile: `0` (sidebar overlays)
  - Desktop (sidebar open): `256px` (ml-64)
  - Desktop (sidebar closed): `0`
- **Padding**: 
  - Mobile: `16px` (p-4)
  - Desktop: `24px` (p-6)
- **Padding Top**: Accounts for fixed header height
- **Max Width**: No max-width, full fluid layout
- **Spacing Between Sections**: `24px` on desktop, `16px` on mobile

### Grid System
- **Summary Cards Grid**: 
  - Mobile: 2 columns (`grid-cols-2`)
  - Desktop: 4 columns (`grid-cols-4`)
  - Gap: `8px` on mobile, `12px` on desktop
  
- **Chart Grid**: 
  - Mobile: 1 column (`grid-cols-1`)
  - Desktop: 2 columns (`grid-cols-2`)
  - Gap: `12px` on mobile, `16px` on desktop
  
- **Footer Grid**: 
  - Mobile: 1 column (`grid-cols-1`)
  - Desktop: 3 equal columns (`grid-cols-3`)
  - Gap: `32px` (gap-8)

### Spacing Scale (Tailwind-based)
- **xs**: `4px` - Tight internal spacing
- **sm**: `8px` - Component internal padding
- **md**: `12px` - Default component gap
- **lg**: `16px` - Section padding (mobile)
- **xl**: `24px` - Section padding (desktop)
- **2xl**: `32px` - Major section gaps
- **3xl**: `48px` - Landing page sections

### Border Radius
- **Small**: `6px` (rounded-md) - Small buttons, badges
- **Medium**: `8px` (rounded-lg) - Cards, buttons, inputs
- **Large**: `12px` (rounded-xl) - Large cards, modals
- **Extra Large**: `16px` (rounded-2xl) - Landing page feature cards
- **Full**: `9999px` (rounded-full) - Circular elements (avatars, icon buttons)

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 Buttons

#### Primary Button
- **Background**: Primary Blue gradient `linear-gradient(to right, #2563EB, #1D4ED8)`
- **Text**: White, font-weight 600 (semibold), size 16px
- **Padding**: `12px 32px` (py-3 px-8) for large, `8px 16px` (py-2 px-4) for medium
- **Border Radius**: `8px` (rounded-lg)
- **Shadow**: `0 10px 15px -3px rgba(37, 99, 235, 0.3)` (shadow-xl)
- **Hover**: 
  - Shadow increases to `0 20px 25px -5px rgba(37, 99, 235, 0.4)`
  - Transform: `translateY(-2px)`
  - Background darkens slightly
- **Transition**: `all 300ms ease`
- **Icon**: 20-24px, positioned with 12px gap from text

#### Secondary Button
- **Background**: 
  - Light mode: Gray 100 `#F3F4F6`
  - Dark mode: Gray 700 `#374151`
- **Text**: 
  - Light mode: Gray 800
  - Dark mode: White
- **Padding**: Same as primary
- **Border Radius**: `8px`
- **Hover**: 
  - Light mode: Gray 200 background
  - Dark mode: Gray 600 background

#### Icon Button (Dark Mode Toggle, Menu)
- **Size**: `40px × 40px` square
- **Padding**: `8px` (p-2)
- **Border Radius**: `8px` (rounded-lg)
- **Background**: 
  - Light mode: Gray 100
  - Dark mode: Gray 700
- **Icon Size**: `20px` (size-5)
- **Hover**: Background darkens
- **Transition**: `all 500ms ease` for dark mode icon animation

#### CTA Button (Landing Page)
- **Background**: Primary Blue gradient
- **Text**: White, `1.125rem` (18px), font-weight 600
- **Padding**: `16px 32px` (py-4 px-8)
- **Border Radius**: `8px`
- **Shadow**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)` (shadow-2xl)
- **Icon**: Right arrow, 24px, with group hover translation `translateX(8px)`
- **Animation**: Gentle bounce `animate-bounce-slow` (2s infinite)
- **Hover**: Shadow increases, `translateY(-4px)`

### 5.2 Cards

#### Summary Statistic Card
- **Size**: Responsive, fills grid column
- **Background**: White (light) / Gray 800 (dark)
- **Border**: 4px colored left border based on metric type
  - Primary Blue: Total innovations
  - Purple: Maturity score
  - Green: Digital innovations
  - Orange: New innovations
- **Border Radius**: `8px` (rounded-lg)
- **Shadow**: `0 1px 3px 0 rgba(0, 0, 0, 0.1)` (shadow-md)
- **Padding**: `12px` on mobile, `16px` on desktop
- **Structure**:
  - Icon: 20px, colored to match border, top left
  - Label: Small text (12-14px), secondary color
  - Value: Large bold text (24-32px), primary color
- **Hover**: `scale(1.05)`, cursor pointer
- **Transition**: `all 300ms ease`

#### Chart Card
- **Background**: White (light) / Gray 800 (dark)
- **Border Radius**: `8px`
- **Shadow**: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`
- **Padding**: `16px` on mobile, `24px` on desktop
- **Header**: 
  - Title: Bold, 18-20px
  - Margin bottom: 16px
- **Chart Area**: 
  - Height: 250px on mobile, 300px on desktop
  - Responsive container fills width

#### Feature Card (Landing Page)
- **Background**: White (light) / Gray 800 (dark)
- **Border Radius**: `16px` (rounded-2xl)
- **Shadow**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` (shadow-lg)
- **Padding**: `32px` (p-8)
- **Structure**:
  - Emoji icon: 48px (text-5xl), margin bottom 16px
  - Title: Bold 20px (text-xl), margin bottom 12px
  - Description: Regular 16px, line height 1.75
- **Hover**: 
  - `scale(1.05)`
  - Shadow increases to shadow-2xl
  - Background tints to blue-50 (light) / gray-750 (dark)
- **Transition**: `all 300ms ease`
- **Layout**: 2x2 grid on desktop, stacked on mobile

### 5.3 Forms & Inputs

#### Text Input
- **Background**: 
  - Light mode: White
  - Dark mode: Gray 600 `#4B5563`
- **Border**: 
  - Default: 1px solid Gray 300 (light) / Gray 500 (dark)
  - Focus: 2px solid Primary Blue `#2563EB`
- **Border Radius**: `8px` (rounded-lg)
- **Padding**: `8px 12px` (py-2 px-3)
- **Font Size**: `14px` (text-sm)
- **Height**: `40px`
- **Placeholder**: Gray 400 (light) / Gray 500 (dark)
- **Focus**: Ring 2px Primary Blue, outline none
- **Transition**: `all 200ms ease`

#### Select Dropdown
- Same styling as text input
- Padding right increased for dropdown arrow
- Custom arrow icon: Chevron down, 16px

#### Login Form Modal
- **Container**: 
  - Width: `256px` (w-64)
  - Background: White (light) / Gray 700 (dark)
  - Border Radius: `8px`
  - Shadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1)` (shadow-xl)
  - Border: 1px solid Gray 200 (light) / Gray 600 (dark)
- **Padding**: `16px` (p-4)
- **Position**: Absolute, right aligned below profile button

### 5.4 Navigation

#### Sidebar Navigation Item
- **Width**: Full sidebar width
- **Height**: `48px` (py-3)
- **Padding**: `16px` horizontal (px-4)
- **Border Radius**: `8px`
- **Icon**: 20px, left aligned
- **Text**: Medium weight 500, 16px
- **Gap**: 12px between icon and text
- **Active State**:
  - Background: Primary Blue `#2563EB`
  - Text: White
- **Inactive State**:
  - Background: Transparent
  - Text: Gray 700 (light) / Gray 300 (dark)
- **Hover State (Inactive)**:
  - Background: Gray 100 (light) / Gray 700 (dark)
- **Transition**: `all 200ms ease`

#### Footer Navigation
- **Background**: Primary Blue (light) / Gray 800 (dark)
- **Text**: White for all text
- **Padding**: `32px` vertical, responsive horizontal
- **Grid**: 3 columns on desktop (Logo, Contact, Social)
- **Logo**: Height 112-128px (h-28 md:h-32)
- **Section Titles**: Bold 18px (text-lg), margin bottom 16px
- **Links**: 
  - Text size: 14px (text-sm)
  - Color: Blue 100 `#DBEAFE` (semi-transparent white)
  - Hover: White
  - Transition: colors 200ms
- **Icons**: 18px, paired with text
- **Social Links**:
  - Icon background: Blue 600, padding 8px, rounded-lg
  - Hover: Blue 700 background
  - External link icon appears on hover
- **Copyright**: 
  - Position: Bottom of footer, centered, full width
  - Border top: 1px Blue 400
  - Padding top: 24px, margin top 24px
  - Text size: 12px (text-xs)
  - Color: Blue 100

### 5.5 Charts & Data Visualization

#### Line Chart (Trend Data)
- **Library**: Recharts
- **Container**: ResponsiveContainer, 100% width, 250-300px height
- **Colors**:
  - Line 1 (Digital): `#2563EB`, stroke width 2px
  - Line 2 (Non-Digital): `#10B981`, stroke width 2px
  - Line 3 (Technology): `#F59E0B`, stroke width 2px
- **Grid**: Dashed `strokeDasharray="3 3"`, Gray 200 (light) / Gray 700 (dark)
- **Axes**: 
  - Color: Gray 500 (light) / Gray 400 (dark)
  - Font size: 12px
- **Tooltip**:
  - Background: White (light) / Gray 800 (dark)
  - Border: 1px Gray 200 (light) / Gray 700 (dark)
  - Text: Primary color
  - Padding: 8px
  - Border radius: 6px
- **Legend**: Font size 12px, below chart

#### Bar Chart (Maturity Distribution)
- **Bar Color**: Primary Blue `#2563EB`
- **Bar Border Radius**: Top corners rounded 8px `radius={[8, 8, 0, 0]}`
- **Same grid, axes, tooltip styling as line chart**

#### Horizontal Bar Chart (Top OPD/Regions)
- **Layout**: Vertical (horizontal bars)
- **Bar Color**: Primary Blue or Green depending on metric
- **Y-axis Width**: 150px for OPD names, 120px for regions
- **Y-axis Font**: 10px
- **Bar Radius**: Right corners rounded `radius={[0, 8, 8, 0]}`

#### Pie Chart
- **Segments**: 
  - Segment 1: Indigo 500 `#6366F1`
  - Segment 2: Green 500 `#10B981`
- **Label**: Inside or outside based on size
- **Animation**: On mount, duration 800ms

### 5.6 Modals & Overlays

#### Modal Container
- **Background**: White (light) / Gray 700 (dark)
- **Border Radius**: `12px` (rounded-xl)
- **Shadow**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)` (shadow-2xl)
- **Max Width**: `500px` for forms, `800px` for data views
- **Padding**: `24px` (p-6)
- **Border**: 1px solid Gray 200 (light) / Gray 600 (dark)
- **Backdrop**: Semi-transparent black `rgba(0, 0, 0, 0.5)`, blur 4px

#### Modal Header
- **Font Size**: 20px (text-xl)
- **Font Weight**: Bold 700
- **Margin Bottom**: 16px
- **Border Bottom**: 1px Gray 200 (light) / Gray 600 (dark)
- **Padding Bottom**: 12px

### 5.7 Special Components

#### AI Auto Insight Cards (Horizontal Scroll)
- **Container**: Flex row, overflow-x auto, hide scrollbar
- **Card**: 
  - Width: `320px` (w-80), flex-shrink-0
  - Padding: `16px` (p-4)
  - Border Radius: `8px`
  - Border Left: 4px colored based on type
    - Success: Green 500
    - Warning: Yellow 500
    - Info: Blue 500
  - Background: Gray 50 (light) / Gray 700 (dark)
- **Icon**: 32px emoji, left aligned
- **Text**: 14px, secondary color
- **Gap**: 16px between cards

#### AI Chatbot Messages
- **User Message**:
  - Background: Primary Blue `#2563EB`
  - Text: White
  - Align: Right
  - Border Radius: `12px 12px 4px 12px` (rounded corner on bottom right)
  - Padding: `12px 16px`
  - Max Width: 80%
  
- **Bot Message**:
  - Background: Gray 100 (light) / Gray 700 (dark)
  - Text: Primary color
  - Align: Left
  - Border Radius: `12px 12px 12px 4px`
  - Padding: `12px 16px`
  - Max Width: 80%
  - Icon: Bot icon 24px, left of message

- **Typing Indicator**:
  - 3 animated dots
  - Animation: Bounce with stagger
  - Color: Gray 400

#### AI Disclaimer Banner
- **Background**: Yellow 50 (light) / Yellow 900/20 (dark)
- **Border**: 1px Yellow 200 (light) / Yellow 700 (dark)
- **Border Left**: 4px Yellow 500
- **Border Radius**: `8px`
- **Padding**: `12px 16px`
- **Icon**: Alert circle, Yellow 600, 20px
- **Text**: 14px, Gray 700 (light) / Gray 300 (dark)
- **Structure**: Icon left, text right with 12px gap

#### Skeleton Loader
- **Background**: Gray 200 (light) / Gray 700 (dark)
- **Animation**: Pulse (opacity 1 → 0.5 → 1, 2s infinite)
- **Border Radius**: Matches component being loaded
- **Shapes**: Rectangular blocks matching card, chart, or table structure

#### Empty State
- **Container**: 
  - Centered flex column
  - Padding: `64px 16px` (py-16 px-4)
  - Background: White (light) / Gray 800 (dark)
  - Border Radius: `8px`
  - Shadow: `shadow-md`
- **Icon**: 64px, Gray 400 (light) / Gray 600 (dark)
- **Title**: 20px bold, margin bottom 8px
- **Description**: 14px, secondary color, centered, max-width 448px
- **Action Button**: Primary button style

#### Map Clustering Markers
- **Marker**: 
  - Background: Red/Blue/Green based on data density
  - Size: 32px circle
  - Text: White, bold, centered (count)
  - Border: 2px white
  - Shadow: `0 2px 4px rgba(0, 0, 0, 0.2)`
- **Tooltip on Hover**:
  - White background
  - Shadow: shadow-lg
  - Padding: 8px 12px
  - Border Radius: 6px
  - Arrow pointing to marker

#### Collaboration Score Badge
- **Shape**: Rounded rectangle or circular
- **Size**: 48-64px diameter (for circular)
- **Background**: Gradient based on score
  - High (85+): Green gradient
  - Medium (70-84): Blue gradient
  - Low (<70): Orange gradient
- **Text**: 
  - Score: Large bold white number (24px)
  - Label "Score": Small white text (10px)
- **Border**: 3px white

---

## 6. PAGE STRUCTURE & CONTENT

### 6.1 Landing Page

#### Layout
- **Header**: Sticky, glassmorphism effect, contains logo and dark mode toggle
- **Hero Section**:
  - Large centered logo (192-256px height)
  - Hero heading: "Dashboard Inovasi Daerah" + "BRIDA Jatim" (blue)
  - Subtitle: Description paragraph, max-width 768px
  - CTA button: "Mulai Eksplorasi" with right arrow icon
  - Vertical padding: 48-80px
  
- **Purpose Section**:
  - Section title: "Tujuan Dashboard"
  - 2×2 grid of feature cards (4 total)
  - Cards contain:
    1. Visualisasi Data Inovasi (📊 emoji)
    2. AI-Powered Insights (🤖 emoji)
    3. Pemetaan Regional (🗺️ emoji)
    4. Pengambilan Keputusan (📈 emoji)
  - Margin top: 80px
  
- **Footer**: Full-width footer component (detailed below)

#### Animations
- Logo: Fade in, hover scale 1.05
- Heading: Slide up animation
- Subtitle: Slide up with delay
- CTA button: Continuous slow bounce
- Feature cards: Hover scale 1.05 + shadow increase

### 6.2 Dashboard Home Page

#### Content Structure
1. **Summary Statistics (Top Section)**
   - Section title: "Ringkasan Statistik Inovasi"
   - 4 statistic cards in responsive grid:
     - Total Inovasi: 430 (blue border, TrendingUp icon)
     - Rata-rata Kematangan: 3.8 (purple border, Award icon)
     - Inovasi Digital: 215 (green border, Sparkles icon)
     - Inovasi Baru 2026: 57 (orange border, Calendar icon)

2. **Visualisasi Data**
   - Section title: "Visualisasi Data"
   - 2-column grid (stacks on mobile):
     - **Chart 1**: Line chart - "Tren Inovasi Per Bulan"
       - 3 lines: Digital, Non-Digital, Teknologi
       - X-axis: Jan-Dec months
       - Y-axis: Count (0-70)
     - **Chart 2**: Bar chart - "Distribusi Kematangan Inovasi"
       - 4 bars: Inisiasi, Uji Coba, Penerapan, Inovasi Matang
       - Values: 85, 120, 145, 80

3. **Capaian Inovasi OPD dan Daerah Terbaik**
   - Section title
   - 2-column grid:
     - **Left**: Horizontal bar chart - "Top 5 OPD Berdasarkan Jumlah Inovasi"
       - 5 OPDs: Kominfo (45), Kesehatan (38), Pendidikan (32), Bappeda (28), Perhubungan (24)
     - **Right**: Horizontal bar chart - "Top 5 Daerah Berdasarkan Rata-rata Kematangan"
       - 5 regions with scores: Surabaya (4.5), Malang (4.2), Sidoarjo (4.0), etc.

4. **AI Auto Insight**
   - Horizontal scrolling card container
   - Navigation arrows (left/right chevrons)
   - 5 insight cards with colored left borders (green/yellow/blue)
   - Each card: Emoji icon + text description

5. **Executive Summary Report**
   - Card with title, description, and "Export PDF" button
   - FileDown icon + "Export PDF" text

### 6.3 Analytics Page (Analitik Inovasi)

#### Structure
1. **Page Header**
   - Title: "Analitik Inovasi"
   - "Export Data" button with Download icon

2. **Filter Panel**
   - Card with Filter icon + "Filter Data" title
   - 4-column grid of dropdowns (stacks on mobile):
     - Tahun (Year)
     - OPD (Agency)
     - Jenis Inovasi (Type)
     - Bentuk Inovasi (Form)

3. **Charts Grid**
   - **Chart 1**: Bar chart - "Tingkat Kematangan per OPD"
   - **Chart 2**: Pie chart - "Distribusi Jenis Inovasi" (Digital vs Non-Digital)
   - **Chart 3**: Line chart - "Tren Inovasi per Kota" (Multi-line, 3 cities)

4. **Data Table**
   - Title: "Detail Data Inovasi"
   - Searchable table with columns:
     - No, Nama Inovasi, OPD, Jenis, Bentuk, Kematangan, Tahun
   - Pagination controls
   - Rows highlight on hover
   - 8 rows of sample innovation data

### 6.4 Map Innovation Page (Peta Inovasi Daerah)

#### Layout
1. **Page Header**
   - Title: "Peta Inovasi Daerah"
   - Controls row:
     - Dropdown filter: Region selector
     - Toggle buttons: "Peta Lokasi" | "Perbandingan"

2. **Map View (Peta Lokasi)**
   - Google Maps embed showing East Java
   - Clustered markers for each region
   - Marker labels show innovation count
   - Info window on marker click shows:
     - Region name
     - Number of innovations
     - Maturity level
     - Dominant type

3. **Comparison View (Perbandingan)**
   - Horizontal bar chart comparing top 6 regions
   - Bars show innovation count per region

4. **Region Statistics Grid**
   - 3-column grid of region cards (stacks to 1 column on mobile)
   - Each card shows:
     - Region name
     - MapPin icon
     - Innovation count (large number)
     - Maturity score with star rating
     - Colored badge for dominant type
     - Bar indicator for relative size

5. **Regional Insights**
   - Text-based insights about regional distribution
   - Color-coded cards similar to AI insights

### 6.5 AI Chatbot Page (AI Rekomendasi Kolaborasi)

#### Layout
1. **Page Header**
   - Title: "AI Rekomendasi Kolaborasi"
   - AI disclaimer banner:
     - "Rekomendasi dihasilkan oleh AI berdasarkan analisis data. Mohon verifikasi dengan pihak terkait."
     - Yellow/amber warning styling

2. **Two-Column Layout**
   - **Left Column (60%)**:
     - **Chat Interface**:
       - Messages container (scrollable, max height)
       - User messages (right-aligned, blue background)
       - Bot messages (left-aligned, gray background)
       - Typing indicator when processing
       - Error state message if failure
       - Chat input at bottom:
         - Text input field
         - Send button with icon
         - Placeholder: "Tanyakan tentang kolaborasi inovasi..."
     - **AI welcome message**: 
       - "Halo! Saya AI Assistant BRIDA Jatim..."
   
   - **Right Column (40%)**:
     - **Innovation Comparison Section**:
       - Title: "Cari Peluang Kolaborasi"
       - Two dropdowns to select innovations
       - "Analisis Kolaborasi" button with Zap icon
     - **Recommended Collaborations**:
       - Title: "Top Rekomendasi Kolaborasi"
       - List of 3 collaboration cards:
         - Title
         - Collaboration type badge
         - Score badge (circular, color-coded)
         - Brief description
         - "Lihat Detail" button

3. **Collaboration Detail Modal** (opens on "Lihat Detail")
   - Large modal with:
     - Collaboration title
     - Score badge (large, top right)
     - Type badge
     - Info grid:
       - OPD involved
       - Benefits (Manfaat)
       - Impact (Dampak)
       - Target users
       - Integration potential
       - Reason (Alasan)
     - "Tutup" close button

### 6.6 Data Management Page

#### Access Control
- Displays login prompt if user not authenticated
- Shows full CRUD interface if user is logged in as admin

#### Logged Out View
- Empty state component
- Icon: Lock or User
- Message: "Silakan login sebagai admin untuk mengelola data"
- "Login" button

#### Logged In View
1. **Page Header**
   - Title: "Data Management"
   - Buttons:
     - "Tambah Inovasi" (Plus icon, primary button)
     - "Export Data" (Download icon)

2. **Filters & Search**
   - Search input (left)
   - Filter dropdowns (right):
     - Jenis (Type)
     - Status

3. **Data Table**
   - Columns: No, Nama, OPD, Jenis, Bentuk, Kematangan, Tahun, Status, Aksi
   - Status badges: 
     - "Aktif" (green)
     - "Pilot" (yellow)
     - "Arsip" (gray)
   - Action buttons per row:
     - Edit (Edit2 icon)
     - Delete (Trash2 icon, red on hover)
     - View detail (Eye icon)

4. **Add/Edit Modal**
   - Form fields:
     - Nama Inovasi (text input)
     - OPD (dropdown)
     - Jenis Inovasi (dropdown: Digital/Non-Digital)
     - Bentuk Inovasi (dropdown)
     - Kematangan (number slider or input, 1-5)
     - Tahun (year picker)
     - Deskripsi (textarea)
     - Status (dropdown)
   - Buttons:
     - "Simpan" (primary)
     - "Batal" (secondary)

5. **Delete Confirmation Modal**
   - Warning icon
   - Title: "Hapus Inovasi?"
   - Message: "Data yang dihapus tidak dapat dikembalikan"
   - Buttons:
     - "Hapus" (red, destructive)
     - "Batal" (gray, secondary)

### 6.7 Footer (All Pages Except Landing)

#### Structure
- 3-column grid on desktop, stacked on mobile
- **Column 1: Logo & Description**
  - BRIDA Jatim logo (112-128px height)
  - Text: "Badan Riset dan Inovasi Daerah Provinsi Jawa Timur"
  
- **Column 2: Contact Information** ("Kontak Kami")
  - MapPin icon + Address (3 lines):
    - Jl. Gayung Kebonsari No.56
    - Gayungan, Kec. Gayungan
    - Surabaya, Jawa Timur 60235
  - Phone icon + (031) 8290738 (clickable tel: link)
  - Mail icon + ses-diri@brin.go.id (clickable mailto: link)
  
- **Column 3: Social Media** ("Ikuti Kami")
  - Instagram link:
    - Instagram icon in blue box
    - @bridajatim text
    - External link icon (appears on hover)
    - Link: https://www.instagram.com/bridajatim/
  - Twitter/X link:
    - Twitter icon in blue box
    - @balitbangjatim text
    - External link icon (appears on hover)
    - Link: https://x.com/balitbangjatim
  - Copyright section (bottom):
    - Border top (blue-400)
    - Text: "© 2026 BRIDA Jatim. All Rights Reserved"
    - Small text (12px)

---

## 7. INTERACTIVE STATES & ANIMATIONS

### Hover States
- **Cards**: Scale 1.05, shadow increase, 300ms transition
- **Buttons**: Darken background, translate Y -2px, shadow increase
- **Links**: Underline or color change to primary blue
- **Table Rows**: Background tint gray-50 (light) / gray-700 (dark)
- **Navigation Items**: Background gray-100 (light) / gray-700 (dark)
- **Social Icons**: Background darkens, external link icon fades in

### Active States
- **Navigation**: Primary blue background, white text, bold
- **Buttons**: Scale 0.98 on click
- **Inputs**: 2px blue ring, blue border
- **Tabs**: Blue background, white text, bottom border

### Focus States
- **All Interactive Elements**: 2px blue ring (`focus:ring-2 focus:ring-blue-500`)
- **Inputs**: Blue border, outline none
- **Buttons**: Blue ring offset 2px

### Loading States
- **Skeleton Loaders**: Pulse animation on cards, charts, tables
- **Buttons**: 
  - Disabled state (opacity 0.6, cursor not-allowed)
  - Spinner icon replaces content (16px, spinning)
- **Chat Typing Indicator**: 
  - 3 dots bouncing sequentially
  - Animation duration: 1.4s infinite

### Error States
- **Form Inputs**: 
  - Red border
  - Red text below showing error message
  - Red icon (AlertCircle)
- **Empty State**: 
  - Large icon (SearchX, FileX, AlertCircle)
  - Title + description
  - Action button to reset or retry
- **Chat Error Message**:
  - Red left border
  - Red icon
  - Text: "Terjadi kesalahan. Silakan coba lagi."
  - Retry button

### Transitions
- **All Color Changes**: `transition-colors duration-300`
- **All Transforms**: `transition-transform duration-300`
- **All General**: `transition-all duration-300`
- **Dark Mode Toggle**: `transition-all duration-500` (slower for smooth theme change)
- **Sidebar**: `transition-all duration-300 ease-in-out`
- **Modal**: Fade in backdrop (200ms), scale modal from 0.95 to 1 (300ms)

### Animations (CSS Keyframes)
- **fade-in**: Opacity 0 → 1, 800ms
- **slide-up**: Opacity 0 + translateY(20px) → Opacity 1 + translateY(0), 600ms
- **slide-up-delay**: Same as slide-up but with 200ms delay
- **bounce-slow**: TranslateY 0 → -10px → 0, 2s infinite
- **spin**: Rotate 0 → 360deg, 4s linear infinite (for sun icon)
- **bounce**: TranslateY -25% → 0 → -25%, 2s infinite (for moon icon)

---

## 8. DARK MODE SPECIFICATIONS

### Dark Mode Toggle
- **Icon**: 
  - Light mode: Moon icon (blue), bouncing animation
  - Dark mode: Sun icon (yellow), spinning animation
- **Button**: Rounded-lg, gray background, 40px size
- **Position**: Top right header, left of profile menu

### Color Transitions
- All backgrounds, text, borders transition smoothly (500ms duration)
- Use `transition-colors duration-300` on all elements

### Dark Mode Overrides
- **Backgrounds**:
  - Body: `#111827` (gray-900)
  - Cards: `#1F2937` (gray-800)
  - Sidebar/Header: `#1F2937` (gray-800)
  - Inputs: `#4B5563` (gray-600)
  - Hover: `#374151` (gray-700)
  
- **Text**:
  - Primary: `#FFFFFF`
  - Secondary: `#D1D5DB` (gray-300)
  - Muted: `#9CA3AF` (gray-400)
  
- **Borders**:
  - Default: `#374151` (gray-700)
  - Subtle: `#4B5563` (gray-600)
  
- **Chart Elements**:
  - Grid: `#374151`
  - Axes: `#9CA3AF`
  - Tooltip background: `#1F2937`
  - Tooltip border: `#374151`

- **Preserved Colors**:
  - Primary Blue: Stays `#2563EB` (maintains brand identity)
  - Success Green: Stays `#10B981`
  - Warning Yellow/Amber: Stays `#F59E0B`
  - Error Red: Stays `#EF4444`

### Dark Mode Class Structure
- Root element gets `.dark` class when dark mode active
- All components check `darkMode` boolean prop
- Conditional classes: `${darkMode ? 'bg-gray-900' : 'bg-white'}`
- Transition applied to all color-changing elements

---

## 9. RESPONSIVE BREAKPOINTS & BEHAVIOR

### Breakpoints (Tailwind)
- **Mobile**: `< 640px` (default, no prefix)
- **Tablet**: `640px - 1023px` (sm: and md:)
- **Desktop**: `1024px+` (lg: and xl:)

### Responsive Patterns

#### Header
- **Mobile**: 
  - Logo height: 40px
  - Menu icon: 18px
  - Compact padding (py-1.5)
  - Profile avatar: 28px
- **Desktop**: 
  - Logo height: 64px
  - Menu icon: 20px
  - Standard padding (py-2)
  - Profile avatar: 28px

#### Sidebar
- **Mobile**: 
  - Overlays content (fixed, z-40)
  - Hamburger toggles visibility
  - Backdrop darkens page when open
  - Full width or 256px
- **Desktop**: 
  - Pushes content (margin-left on main)
  - Always visible by default (can toggle)
  - No backdrop

#### Grid Layouts
- **Stats Cards**: 2 columns mobile → 4 columns desktop
- **Charts**: 1 column mobile → 2 columns desktop
- **Feature Cards (Landing)**: 1 column mobile → 2 columns desktop
- **Footer**: 1 column mobile → 3 columns desktop
- **Data Table**: Horizontal scroll on mobile, full view on desktop

#### Typography Scaling
- **Hero H1**: 36px mobile → 60px desktop
- **Page H1**: 24px mobile → 30px desktop
- **Section H2**: 20px mobile → 24px desktop
- **Body**: 16px consistent
- **Small**: 14px consistent

#### Spacing Scaling
- **Section Padding**: 16px mobile → 24px desktop
- **Card Padding**: 12px mobile → 16px desktop
- **Chart Card Padding**: 16px mobile → 24px desktop
- **Gap**: 8px mobile → 12-16px desktop

#### Chart Heights
- **Mobile**: 250px
- **Desktop**: 300px

### Mobile-Specific Patterns
- Touch targets minimum 44px × 44px
- Horizontal scrolling for AI insights (scrollbar hidden)
- Stacked layout for complex data tables
- Larger padding on interactive elements
- Bottom-aligned floating action buttons (if needed)

### Tablet-Specific Patterns
- Hybrid of mobile and desktop
- Sidebar can overlay or push based on user preference
- 2-column grids where appropriate
- Comfortable spacing between elements

---

## 10. UX PRINCIPLES & MICRO-INTERACTIONS

### Core UX Principles
1. **Progressive Disclosure**: Show essential info first, details on interaction
2. **Skeleton Loading**: Show content structure while data loads
3. **Empty States**: Always provide guidance when no data exists
4. **Error Recovery**: Clear error messages with actionable steps
5. **Feedback**: Immediate visual response to all user actions
6. **Consistency**: Same patterns across all pages
7. **Accessibility**: Keyboard navigation, screen reader support, high contrast

### Micro-Interactions
1. **Button Click**: Scale 0.98, shadow reduction
2. **Card Hover**: Scale 1.05, shadow increase, background tint
3. **Chart Tooltip**: Fade in on hover, follow cursor
4. **Navigation Active**: Slide in from left, background color change
5. **Dark Mode Toggle**: Smooth 500ms transition, icon rotation/animation
6. **Input Focus**: Border color change, ring appearance
7. **Modal Open**: Backdrop fade in, modal scale from 0.95 to 1
8. **Loading**: Pulse animation on skeleton loaders
9. **Chat Message**: Slide in from bottom, typing effect for bot
10. **AI Insight Cards**: Horizontal scroll with arrow navigation

### Data Visualization UX
- **Tooltips**: Show on hover, display exact values
- **Legend**: Interactive, click to toggle data series
- **Zoom**: Allow zoom on maps
- **Filtering**: Real-time chart updates when filters change
- **Color Consistency**: Same colors represent same data across charts
- **Labels**: Clear, concise, localized to Indonesian

### Form UX
- **Validation**: Real-time validation as user types
- **Error Messages**: Specific, actionable, appear immediately
- **Success Feedback**: Toast notification or inline message
- **Disabled State**: Visual indicator (opacity, cursor)
- **Required Fields**: Asterisk or "Required" label
- **Placeholders**: Example values or instructions

### Navigation UX
- **Active Page**: Clear visual indicator in sidebar
- **Breadcrumbs**: (If added) Show page hierarchy
- **Back Button**: (If needed) Clear return path
- **Page Persistence**: Remember last visited page on refresh
- **Smooth Scrolling**: When navigating to sections

---

## 11. ACCESSIBILITY REQUIREMENTS

### Color Contrast
- **Text on Light Background**: Minimum 4.5:1 contrast ratio
- **Text on Dark Background**: Minimum 4.5:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio
- **Charts**: Distinguishable by pattern, not just color

### Keyboard Navigation
- **Tab Order**: Logical, follows visual flow
- **Focus Indicators**: Visible 2px blue ring on all interactive elements
- **Skip Links**: (Optional) Jump to main content
- **Escape Key**: Closes modals/dropdowns
- **Enter/Space**: Activates buttons and links
- **Arrow Keys**: Navigate dropdowns and carousels

### Screen Readers
- **Alt Text**: All images have descriptive alt attributes
- **ARIA Labels**: Buttons and icons have aria-label
- **ARIA Roles**: Proper roles for complex components (tabs, dialogs)
- **Live Regions**: For dynamic content (chat messages, notifications)
- **Semantic HTML**: Use h1-h6, nav, main, footer, article, section

### Other Accessibility Features
- **Text Scaling**: Layout supports up to 200% zoom
- **No Flashing Content**: Animations slower than 3 flashes/second
- **Error Identification**: Clear, not color-only
- **Consistent Navigation**: Same navigation across pages
- **Language**: HTML lang attribute set to "id" (Indonesian)

---

## 12. TECHNICAL SPECIFICATIONS

### Framework & Libraries
- **React**: Component-based architecture
- **Tailwind CSS**: Utility-first CSS framework, version 4.0
- **Recharts**: For data visualization charts
- **Lucide React**: Icon library
- **LocalStorage**: For persisting theme, login state, active page

### Browser Support
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile Safari**: iOS 13+
- **Chrome Mobile**: Android 8+

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Image Optimization**: WebP format, lazy loading
- **Code Splitting**: Lazy load components for faster initial load

### Data Structure Examples

#### Innovation Data Object
```javascript
{
  id: number,
  nama: string,
  opd: string,
  jenis: "Digital" | "Non-Digital",
  bentuk: "Aplikasi" | "Sistem" | "Metode Baru" | "SOP Baru",
  kematangan: number (1-5),
  tahun: number,
  deskripsi: string,
  status: "Aktif" | "Pilot" | "Arsip"
}
```

#### Region Data Object
```javascript
{
  id: number,
  name: string,
  lat: number,
  lng: number,
  inovasi: number,
  kematangan: number (1-5),
  dominant: "Digital" | "Non-Digital",
  color: string (tailwind color class)
}
```

#### Collaboration Recommendation Object
```javascript
{
  id: number,
  title: string,
  jenis: "Kolaborasi Antar OPD" | "Kolaborasi Multi-OPD" | "Kolaborasi Antar Daerah",
  opd1: string,
  opd2: string,
  score: number (0-100),
  manfaat: string,
  dampak: string,
  urusan: string,
  targetPengguna: string,
  potensiIntegrasi: "Sangat Tinggi" | "Tinggi" | "Sedang",
  alasan: string
}
```

---

## 13. CONTENT SPECIFICATIONS (Indonesian Language)

### Text Tone & Voice
- **Professional**: Government institution tone
- **Clear**: Simple, jargon-free language
- **Informative**: Data-driven, factual
- **Helpful**: User-centric, actionable guidance

### Standard Text Elements

#### Navigation Labels
- Dashboard
- Analitik
- Peta Inovasi
- AI Rekomendasi
- Data Management

#### Button Labels
- Mulai Eksplorasi
- Login Admin
- Logout
- Simpan
- Batal
- Hapus
- Export PDF
- Export Data
- Tambah Inovasi
- Lihat Detail
- Reset Filter
- Analisis Kolaborasi

#### Section Titles
- Ringkasan Statistik Inovasi
- Visualisasi Data
- Capaian Inovasi OPD dan Daerah Terbaik
- AI Auto Insight
- Executive Summary Report
- Top Rekomendasi Kolaborasi
- Cari Peluang Kolaborasi

#### Form Labels
- Nama Inovasi
- OPD (Organisasi Perangkat Daerah)
- Jenis Inovasi
- Bentuk Inovasi
- Kematangan
- Tahun
- Deskripsi
- Status

#### Placeholder Text
- "Cari inovasi..."
- "Masukkan nama inovasi"
- "Tanyakan tentang kolaborasi inovasi..."
- "Pilih OPD"

#### Messages
- Success: "Data berhasil disimpan"
- Error: "Terjadi kesalahan. Silakan coba lagi"
- Empty: "Data tidak ditemukan"
- Login Error: "Username atau password salah!"
- Login Success: (Redirect to page)

---

## 14. LOGO & BRANDING

### BRIDA Jatim Logo
- **Format**: PNG with transparent background
- **Colors**: Blue and potentially red/white (Indonesian government colors)
- **Usage**:
  - Header: 40px mobile, 64px desktop height
  - Landing page hero: 192-256px height
  - Footer: 112-128px height
- **Spacing**: 8-12px margin around logo in header
- **Alternative**: Text-only fallback: "BRIDA Jatim"

### Brand Colors (as specified)
- Primary: `#2563EB` (Blue 600)
- Accent: Green `#10B981` for positive metrics
- Background: Slate/Gray scale for neutrality

---

## 15. FINAL IMPLEMENTATION NOTES

### Page Flow
1. **First Visit**: User lands on Landing Page
2. **Click "Mulai Eksplorasi"**: Navigate to Dashboard Home
3. **Dashboard Navigation**: Use sidebar to switch between pages
4. **Persistent State**: Last visited page and theme preference saved to localStorage
5. **Data Management**: Requires admin login (username: admin, password: admin123)
6. **Logout**: Returns to unauthenticated state, but stays on current page

### Data Source
- **Real Innovation Data**: Uses CSV data structure for East Java regional innovations
- **Mock Data**: For demo purposes, all data is static/hardcoded
- **API Ready**: Structure supports future API integration

### Future Enhancements (Out of Scope for Initial Build)
- Real-time data updates
- Supabase backend integration
- Advanced filtering and search
- Export to Excel/CSV
- Multi-user roles and permissions
- Notification system
- Advanced AI chat with actual LLM
- Real map clustering with Leaflet or Mapbox

---

## USAGE INSTRUCTIONS FOR FIGMA MAKE

To use this prompt in Figma Make:

1. Copy the entire prompt above
2. Paste into Figma Make's AI prompt input
3. Specify: "Create a complete web application dashboard for BRIDA Jatim (East Java Regional Research and Innovation Agency) with 6 pages: Landing Page, Dashboard Home, Analytics, Map Innovation, AI Chatbot, and Data Management. Include all components, styling, interactions, and dark mode as specified in this detailed design document."
4. Emphasize key requirements:
   - Modern government dashboard aesthetic
   - Primary blue #2563EB color scheme
   - Full dark/light mode support
   - Responsive design (mobile to desktop)
   - Indonesian language content
   - Data visualization with charts (Recharts)
   - Interactive maps
   - AI chatbot interface
   - Admin login and CRUD operations

This prompt provides complete specifications to recreate the BRIDA Jatim dashboard with pixel-perfect accuracy, consistent styling, proper interactions, and all functional requirements.

---

**End of Design Prompt**
