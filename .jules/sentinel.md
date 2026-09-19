## 2024-06-25 - Architectural Vulnerability: Backend Logic in Frontend Directory
**Vulnerability:** Backend scripts (`db.ts` and `insertData.js` managing MySQL DB connection and initialization) are placed inside the React frontend directory (`smarthome/src/views/admin/smarthome/`).
**Learning:** This architectural gap creates a risk of exposing sensitive backend logic, database structures, and potentially hardcoded secrets (which were found) if the bundler accidentally includes these files in the client-facing application bundle.
**Prevention:** Always separate backend and frontend codebases. Backend utility scripts should reside in a separate directory entirely (e.g., `server/` or `backend/`) outside the `src/` directory compiled by React tools.
