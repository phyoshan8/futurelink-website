# How to Convert Figma to Code (Pixel Perfect)

To implement a Figma design exactly in code (React + Tailwind), follow this systematic workflow.

## 1. Analyze the Big Picture (The Container)
Before writing code, look at the Figma frame structure.
- **Auto Layout (Vertical)** -> `flex flex-col`
- **Auto Layout (Horizontal)** -> `flex flex-row`
- **Grid Layout** -> `grid grid-cols-X`
- **Constraints/Fixed Width** -> `w-[300px]` or `max-w-md`

## 2. Colors & Design Tokens
Don't hardcode hex codes (e.g., `#1E293B`) repeatedly.
1.  **Identify Colors** in Figma (e.g., Primary Blue, Surface Gray).
2.  **Add to Tailwind config** or CSS variables.
    ```javascript
    // tailwind.config.js
    theme: {
      extend: {
        colors: {
          primary: '#1E40AF', // Matches Figma 'Primary'
          surface: '#F8FAFC',
        }
      }
    }
    ```
3.  **Use classes**: `bg-primary text-surface`.

## 3. Typography
Check the **Inspect** tab in Figma for font properties.
- **Font Family**: "Inter" -> `font-sans` or custom `font-inter`.
- **Size**: 16px -> `text-base` (or `text-[16px]` if precise).
- **Weight**: Bold (700) -> `font-bold`.
- **Line Height**: 150% -> `leading-relaxed`.

## 4. Spacing & Sizing (The "4px Rule")
Tailwind uses a scale where `1 = 0.25rem = 4px`.
- **Padding/Margin**:
    - Figma `24px` -> `p-6` (24 / 4 = 6).
    - Figma `16px` -> `m-4`.
    - Figma `32px` -> `gap-8`.
- **Width/Height**:
    - Figma `Full width` -> `w-full`.
    - Figma `Fixed 200px` -> `w-[200px]`.

## 5. Shadows and Effects
- **Shadows**: Copy the shadow values (X, Y, Blur, Spread) and map to Tailwind.
    - `shadow-sm`, `shadow-md`, `shadow-lg`.
    - Or custom: `shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]`.
- **Border Radius**:
    - `8px` -> `rounded-lg`.
    - `100%` (Circle) -> `rounded-full`.

## 6. The "As-You-Code" Checklist
When implementing a component (e.g., a Card):

1.  **Structure**: Create the `div` hierarchy.
    ```jsx
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
      {/* Content */}
    </div>
    ```
2.  **Measure**: Use Figma's measure tool (click element + hover over neighbor) to verify `gap` and `padding`.
3.  **Check Responsiveness**: Figma designs are usually static (e.g., Desktop 1440px).
    - Ask: "What happens on mobile?"
    - Code: `w-full md:w-1/2` (Full width mobile, half width desktop).

## 7. Exporting Assets
- Select the image/icon in Figma.
- Click **Export**.
- Format:
    - **Icons**: SVG (preferred for quality and color control).
    - **Photos**: JPG or WebP (optimized).
    - **Transparency**: PNG.

## Tool Tip
Use the **Figma "Dev Mode"** (toggle header switch):
- It gives you CSS properties directly.
- It shows exact padding/margin values in the code inspection window.
