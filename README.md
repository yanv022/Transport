# Plateforme de Réservation de Voyages en Bus

Une application React TypeScript moderne pour réserver des trajets en bus avec support multi-rôles (Voyageur, Gestionnaire, Admin).

## Table des matières

- [Stack Technologique](#stack-technologique)
- [Architecture](#architecture)
- [Structure des Dossiers](#structure-des-dossiers)
- [Modèles de Données](#modèles-de-données)
- [Flux de Réservation](#flux-de-réservation)
- [Gestion d'État](#gestion-détat)
- [Configuration](#configuration)
- [Démarrage](#démarrage)

## Stack Technologique

| Domaine | Technologie |
|---------|------------|
| **Framework** | React 18 + TypeScript |
| **Build** | Vite 5 |
| **Styling** | Tailwind CSS 3 |
| **Routing** | React Router 7 |
| **Backend** | Spring Boot 3 + Spring Security (JWT) |
| **Database** | PostgreSQL |
| **API** | REST sécurisée (JWT Bearer Token) |
| **Icons** | Lucide React |
| **QR Code** | qrcode library |

## Architecture

L'application suit une architecture modulaire composée de couches distinctes:

```
Frontend (React + Vite)
↓
Auth / Context Layer
↓
API REST sécurisée (Spring Boot + JWT)
↓
Base de données PostgreSQL

```

### Architecture Détaillée

```
src/
├── pages/                    # Pages principales (Vue)
│   ├── HomePage.tsx          # Page d'accueil
│   ├── LoginPage.tsx         # Authentification
│   ├── RoutesListPage.tsx    # Liste des trajets
│   ├── RouteDetailPage.tsx   # Détails d'un trajet
│   ├── PassengerFormPage.tsx # Formulaire passagers
│   ├── BookingConfirmationPage.tsx # Confirmation
│   └── manager/
│       ├── ManagerDashboardPage.tsx   # Dashboard manager
│       ├── CreateRoutePage.tsx         # Création trajet
│       ├── EditRoutePage.tsx           # Édition trajet
│       └── ManageSchedulesPage.tsx     # Gestion horaires
│
├── components/               # Composants réutilisables
│   ├── Header.tsx            # Barre de navigation
│   ├── Footer.tsx            # Pied de page
│   ├── RouteCard.tsx         # Carte d'un trajet
│   ├── SearchBar.tsx         # Barre de recherche
│   ├── DatePicker.tsx        # Sélecteur de date
│   ├── SeatSelector.tsx      # Sélection des sièges
│   ├── PassengerForm.tsx     # Formulaire passagers
│   ├── TicketDisplay.tsx     # Affichage du billet
│   ├── Button.tsx            # Bouton personnalisé
│   ├── Breadcrumb.tsx        # Fil d'Ariane
│   ├── index.ts              # Exports centralisés
│   └── manager/
│       ├── ManagerRouteCard.tsx
│       └── KPICard.tsx
│
├── context/                  # Gestion d'état globale
│   ├── AuthContext.tsx       # Authentification
│   ├── SearchContext.tsx     # Paramètres de recherche
│   └── BookingsContext.tsx   # Gestion des réservations
│
├── data/                     # Données mock
│   └── mockData.ts           # Données de démo
│
├── utils/                    # Utilitaires
│   └── storage.ts            # Gestion localStorage
│
├── types.ts                  # Types TypeScript
├── constants.ts              # Constantes globales
├── App.tsx                   # Composant racine
├── main.tsx                  # Point d'entrée
└── index.css                 # Styles globaux
```

## Structure des Dossiers

### Pages (`src/pages/`)
Chaque page représente une route principale de l'application. Les pages gèrent la logique métier et coordonnent les composants.

- **HomePage**: Page d'accueil avec liens de navigation
- **LoginPage**: Formulaire d'authentification
- **RoutesListPage**: Affichage des trajets disponibles
- **RouteDetailPage**: Détails complets d'un trajet
- **PassengerFormPage**: Formulaire d'information des passagers
- **BookingConfirmationPage**: Confirmation et billet avec QR code

### Composants (`src/components/`)
Composants réutilisables sans logique métier complexe.

- **Header/Footer**: Éléments structurels
- **RouteCard**: Présentation d'un trajet
- **SearchBar**: Interface de recherche
- **DatePicker**: Sélection de date
- **SeatSelector**: Grille de sièges
- **TicketDisplay**: Billet avec QR code
- **Button**: Bouton personnalisé avec variantes

### Context (`src/context/`)
Fournisseurs de contexte React pour la gestion d'état globale.

```typescript
// AuthContext
useAuth() → { user, isAuthenticated, login(), logout() } 

// SearchContext
useSearch() → { searchParams, setSearchParams }

// BookingsContext
useBookings() → { bookings, addBooking(), updateBooking(), deleteBooking() }
```

### Data (`src/data/`)
Données mock pour le développement et les tests.

```typescript
// mockData.ts
- users: Liste d'utilisateurs pré-configurés
- routes: Trajets disponibles
- authenticate(): Fonction de validation d'authentification
```

### Utils (`src/utils/`)
Fonctions utilitaires et services.

```typescript
// storage.ts - Gestion du localStorage
- getBookings()
- saveBooking()
- updateBooking()
- deleteBooking()
- getBookingById()
- getRouteState()
- saveRouteState()
- clearAllData()
```

## Modèles de Données

### User (Utilisateur)
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'TRAVELER';
}
```

### Route (Trajet)
```typescript
interface Route {
  id: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  company: string;
  amenities: string[];
  schedules: RouteSchedule[];
}
```

### RouteSchedule (Horaire)
```typescript
interface RouteSchedule {
  date: string;
  availableSeats: number;
  price: number;
}
```

### Booking (Réservation)
```typescript
interface Booking {
  id: string;
  route: Route;
  date: string;
  seats: number;
  totalPrice: number;
  timestamp: string;
}
```

## Flux de Réservation

```
┌─────────────┐
│   Accueil   │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│   Recherche Trajet   │
│   (SearchBar)        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│   Liste Trajets      │
│   (RoutesListPage)   │
└──────┬───────────────┘
       │ (Sélection)
       ▼
┌──────────────────────┐
│   Détails Trajet     │
│   (RouteDetailPage)  │
└──────┬───────────────┘
       │ (Confirmer)
       ▼
┌──────────────────────┐
│   Infos Passagers    │
│ (PassengerFormPage)  │
└──────┬───────────────┘
       │ (Finaliser)
       ▼
┌──────────────────────┐
│   Confirmation       │
│  + Billet QR Code    │
└──────────────────────┘
```

## Gestion d'État

### AuthContext
Gère l'authentification utilisateur et la session.

```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```


### SearchContext
Partage les paramètres de recherche entre composants.

```typescript
const { searchParams, setSearchParams } = useSearch();
```

- **État**: Critères de recherche (ville départ, arrivée, date)
- **Usage**: Synchronisation entre SearchBar et pages de résultats

### BookingsContext
Gère les réservations de l'utilisateur.

```typescript
const { bookings, addBooking, updateBooking, deleteBooking } = useBookings();
```

- **État**: Liste des réservations
- **Persistance**: localStorage (`bus_bookings`)
- **Synchronisation**: Utilitaires `storage.ts`

## Flux de Navigation

```
/                          (non authentifié → redirect /login)
├── /login                 (LoginPage)
│
├── /                      (HomePage)
├── /routes                (RoutesListPage)
├── /route/:routeId        (RouteDetailPage)
├── /passengers            (PassengerFormPage)
└── /confirmation          (BookingConfirmationPage)
```

## Stockage Persistant

### localStorage
L'application utilise localStorage pour la persistance côté client.

| Clé | Contenu |
|-----|---------|
| `authSession` | Données de session utilisateur |
| `bus_bookings` | Réservations de l'utilisateur |
| `bus_routes_state` | État des trajets et filtres |


### Authentification
- Basée sur JWT (JSON Web Tokens)
- Spring Security pour sécuriser les endpoints API

## API & Sécurité

Toutes les requêtes protégées utilisent un wrapper `authFetch` :

- Ajout automatique du token JWT
- Gestion centralisée des erreurs
- Protection des routes manager

Exemple :
```ts
authFetch('/routes', 'POST', payload) → { success: boolean, data: Route, error?: string }
```


### Rôles Utilisateurs
- **ADMIN**: Accès complet à l'administration
- **MANAGER**: Gestion des trajets et réservations
- **TRAVELER**: Réservation et consultation des billets

## Configuration

### Variables d'Environnement
Créer un fichier `.env` à la racine:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Dépendances
Installées via npm et listées dans `package.json`:
- React et React Router pour la navigation
- Tailwind CSS pour les styles
- Lucide React pour les icônes
- qrcode pour la génération de codes QR
- Supabase pour la base de données

## Démarrage

### Développement
```bash
npm install
npm run dev
```

### Build Production
```bash
npm run build
```

### Aperçu Production
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

### Vérification des Types
```bash
npm run typecheck
```

## Points Clés de l'Architecture

1. **Séparation des Responsabilités**: Pages pour la logique, composants pour l'UI
2. **État Centralisé**: Contexts React pour la gestion globale
3. **Réutilisabilité**: Composants modulaires et utilities
4. **Persistance**: localStorage pour données côté client
5. **Type Safety**: TypeScript pour éviter les erreurs
6. **Scalabilité**: Structure permettant l'ajout de nouvelles fonctionnalités

## Améliorations Futures

- Intégration complète avec Supabase (migration des données depuis localStorage)
- Authentification Supabase (email/password)
- Backend avec Edge Functions pour les paiements
- Tests unitaires et d'intégration
- Internationalisation (i18n)
- Mode offline avec Service Workers
- Système de notifications en temps réel

---

**Version**: 1.0.0
**Dernière mise à jour**: 2024
