# replicating Coded Animations in Figma

To "draw" the animations in Figma exactly as we coded them (using React, Tailwind, and Framer Motion), you need to map specific **Code Concepts** to **Figma Prototyping Features**.

Here is how to recreate the specific animations currently in your `futurelink-website`.

## 1. Navigation Link Hover (The Underline Effect)
**Code Logic**:
- CSS/Tailwind: `w-0` (width 0) $\rightarrow$ `w-full` (width 100%) on hover.
- Framer Motion: `layoutId="underline"` moves a shared `div` between items.

**Figma Implementation**:
1.  **Create a Component** for the Nav Link (e.g., "Nav Item").
2.  **Create 2 Variants**:
    - `Default`: Text only. Underline (Rectangle) width is **0.001px** (or usually set Layer Opacity to 0% and Width to 1px, but shrinking width is more accurate to code).
    - `Hover`: Duplicate the variant. Change Underline width to match text width.
3.  **Prototype Interaction**:
    - Connect `Default` $\rightarrow$ `Hover`.
    - Trigger: **While Hover**.
    - Animation: **Smart Animate** (Ease Out, ~200ms).

## 2. Mobile Menu (The Slide-Down/Fade-In)
**Code Logic**:
- React State: `isOpen ? 'block' : 'hidden'`.
- Animation: `AnimatePresence` + `initial={{ opacity: 0, y: -20 }}` $\rightarrow$ `animate={{ opacity: 1, y: 0 }}`.

**Figma Implementation**:
1.  **Frame Setup**:
    - Create a "Mobile Header Closed" frame.
    - Create a "Mobile Header Open" frame (with the menu items visible).
2.  **Smart Animate Setup**:
    - Ensure the "Menu Items" group exists in the *Closed* frame but is **hidden** (Opacity 0%) and positioned slightly **higher** (-20px).
    - In the *Open* frame, ensure the same group is **visible** (Opacity 100%) and positioned normally.
3.  **Prototype Interaction**:
    - Click the Hamburger Icon in Frame 1.
    - Navigate to Frame 2.
    - Animation: **Smart Animate** (Ease Out, ~300ms).

## 3. Enrollment Form Simulation (Loading $\rightarrow$ Success)
**Code Logic**:
- `setIsSubmitting(true)` $\rightarrow$ Show Spinner.
- `setTimeout(1500ms)` $\rightarrow$ Show Success Message.
- `setIsSubmitting(false)`.

**Figma Implementation**:
1.  **Create 3 Frames (or Component Variants)**:
    - **State A (Form)**: The normal form inputs + "Submit" button.
    - **State B (Loading)**: Duplicate A. Replace "Submit" text with a "Spinner" icon.
    - **State C (Success)**: Duplicate B. Hide form content or overlay it with the "Green Checkmark" and "Success!" text.
2.  **Prototype Interactions**:
    - **Step 1 (Click)**: Connect "Submit" button (A) $\rightarrow$ State B (Loading).
        - Trigger: **On Click**.
        - Animation: **Instant** or **Dissolve** (Quick).
    - **Step 2 (Time)**: Connect State B (Loading) $\rightarrow$ State C (Success).
        - Trigger: **After Delay** (1500ms).
        - Animation: **Smart Animate** (Ease In Out, 300ms).

## 4. Button Hover (Scale & Color)
**Code Logic**:
- Tailwind: `hover:scale-105 hover:bg-indigo-800 transition-all`.

**Figma Implementation**:
1.  **Component Set**: Create a Button component with `Default` and `Hover` variants.
2.  **Hover Variant**:
    - Change Fill Color (e.g., darker Indigo).
    - Scale layer size (K) by 5% (e.g., 100px $\rightarrow$ 105px).
3.  **Interaction**:
    - Connect `Default` $\rightarrow$ `Hover`.
    - Trigger: **While Hover**.
    - Animation: **Smart Animate** (This interpolates the size and color smoothly).

## Summary Table

| Code Concept | Figma Feature |
| :--- | :--- |
| CSS `hover:` / `transition` | **While Hover** + **Smart Animate** |
| React State (`isOpen`, `isActive`) | **Component Variants** (On Click) |
| `setTimeout` / API Delay | **After Delay** trigger |
| Framer Motion `layoutId` | **Smart Animate** (Matching Layer Names) |

**Critical Rule:** For **Smart Animate** to look like code, layer names MUST match exactly between frames/variants (e.g., "SubmitButton" must be named "SubmitButton" in both the Loading and Normal states).
