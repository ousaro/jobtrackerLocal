## ⚙️ Environment Variables (`front-end`)

Use these in a `.env.local`, `.env.development`, or `.env` file in your project root.

```env
NEXT_PUBLIC_API_URL=
```

---

### Variable Reference

| Variable              | Description                                         |
|-----------------------|-----------------------------------------------------|
| `NEXT_PUBLIC_API_URL` | URL for the API server your frontend will call. Example: `http://localhost:8000/api` |

- **Note:**  
  Any variable prefixed with `NEXT_PUBLIC_` in Next.js will be exposed to the browser at build/runtime.

---

> Adjust for production by setting `NEXT_PUBLIC_API_URL` to your deployed API endpoint.
