# MOMUY & TECH — Site Web Officiel

Site vitrine et interface d'administration pour l'atelier de réparation électronique et micro-soudure **MOMUY & TECH** situé à Momuy (Landes).

## 🛠️ Stack Technique

- **Frontend :** React 18, TypeScript, Vite, Tailwind CSS
- **Composants UI :** Radix UI / Shadcn UI, Lucide Icons
- **Base de données & Auth :** Supabase (`pricing`, `site_content`, `opening_hours`, `site_images`)
- **Routage :** React Router DOM v6
- **SEO & Suivi :** React Helmet Async, Google Analytics 4 (avec bandeau de consentement RGPD)

## 🚀 Démarrage en local

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   Le site est accessible sur `http://localhost:8080`.

3. **Compiler pour la production :**
   ```bash
   npm run build
   ```

4. **Lancer les vérifications de code :**
   ```bash
   npm run lint
   ```

## 📁 Structure Principale

```
src/
├── assets/         # Images, icônes SVG et photos d'atelier
├── components/     # Header, Footer, CookieBanner, Layout, UI
├── hooks/          # Hooks réutilisables (scroll reveal, toast)
├── lib/            # Clients Supabase, Analytics, Utilitaires
└── pages/          # Pages publiques & routes d'administration
```
