## 2023-10-24 - [Hardcoded Database Credentials in Frontend Directory]
**Vulnerability:** Hardcoded database connection details (`user`, `password`, `host`, `database`) in `db.ts` which is located inside the React `src/` directory.
**Learning:** Backend scripts placed inside a frontend directory risk having their secrets exposed if bundled. Using environment variables without a `REACT_APP_` prefix ensures they aren't injected into the client-side build by Create React App, preventing secret leakage.
**Prevention:** Always use environment variables for backend scripts and NEVER prefix them with `REACT_APP_` when they are meant to remain server-side only.
