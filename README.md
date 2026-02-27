This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Zustand — State Management

This project uses **[Zustand](https://github.com/pmndrs/zustand)** for global state management across the dashboard.

### Why Zustand?

| Feature | Zustand | Redux |
|---------|---------|-------|
| Boilerplate | Minimal — just `create()` | Actions, reducers, selectors, providers |
| Bundle size | ~1 KB | ~7 KB + middleware |
| Async logic | Write `async/await` directly inside the store | Requires middleware (thunk / saga) |
| Provider needed | No | Yes (`<Provider>`) |
| Learning curve | Very low | Moderate–High |

Zustand is **simple, lightweight, and scalable** — ideal for small to medium Next.js dashboards like this one.

### Store Architecture

```
store/
├── authStore.js      → user, token, loading, error, loginUser(), logout(), hydrate()
├── userStore.js      → users[], selectedUser, pagination, search, fetchUsers(), fetchUserById()
└── productStore.js   → products[], selectedProduct, categories, pagination, search,
                        fetchProducts(), fetchProductById(), fetchProductsByCategory()
```

### How It Works

```js
// 1. Create a store with state + async actions
import { create } from "zustand";

const useUserStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const data = await getUsers();
            set({ users: data.users, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
}));

// 2. Use in any component — no Provider required
function UsersPage() {
    const { users, loading, fetchUsers } = useUserStore();

    useEffect(() => { fetchUsers(); }, []);

    if (loading) return <Skeleton />;
    return users.map(u => <UserCard key={u.id} user={u} />);
}
```

### Key Patterns Used

- **Async actions inside stores** — all API calls live in the store, keeping components clean
- **`loading` + `error` state** — every store tracks these for consistent UX (skeletons, alerts)
- **`get()` for derived values** — actions read current state via `get()` (e.g., pagination skip = `(page - 1) * limit`)
- **localStorage persistence** — `authStore` saves/restores token on login/hydrate

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
