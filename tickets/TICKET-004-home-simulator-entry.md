# TICKET-004: Home Page Entry for World Cup 2026 Simulator

## Description
Create a prominent entry point on the home page (`app/page.tsx`) to allow users to access the World Cup 2026 Simulator.

## Acceptance Criteria
- [x] Positioning and copywriting defined by @product_owner.
  - **Position**: Directly below the "Adivinhe o Jogador" featured section (between line 63 and 65 of `app/page.tsx`).
  - **Copywriting**:
    - **Title**: "SIMULADOR: Copa do Mundo 2026"
    - **Description**: "Monte sua seleção, projete o caminho até a final e descubra quem será o campeão do mundo em 2026!"
    - **CTA**: "Simular agora →"
- [x] Visual design and mobile-first layout defined by @designer.
   - **Visual Identity**:
     - **Style**: Glassmorphism with a subtle golden tint.
     - **Background**: `rgba(255, 215, 0, 0.1)` with `backdrop-filter: blur(12px)`.
     - **Border**: `2px solid #FFD700` (Ouro Vibrante) with `border-radius: 1.5rem`.
     - **Effects**: Soft gold outer glow (`box-shadow: 0 0 20px rgba(255, 215, 0, 0.3)`).
     - **Icon**: Golden World Cup Trophy icon (SVG/Lucide) positioned to the left of the text on desktop, top on mobile.
     - **Colors**: 
       - Title: `#FFD700` (Bold, uppercase).
       - Description: `rgba(255, 255, 255, 0.9)` (Regular).
       - CTA Button: Background `#FFD700`, Text `#000`, `font-weight: bold`, rounded-full.
     - **Responsiveness**: Mobile-first approach; single column layout on small screens, shifting to a horizontal card layout on larger screens.
- [x] Link implemented directing to `/quiz/simulador`.
- [x] Entry point is visually consistent with other home page elements (like the "Adivinhe o Jogador" card).

## Status
- Status: Closed
- Priority: Medium
- Assignee: @product_owner / @designer
