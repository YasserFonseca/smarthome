## 2023-10-27 - Hardcoded DB Credentials in Frontend Directory
**Vulnerability:** Hardcoded MySQL database credentials (user, password) were found in backend scripts (`db.ts`) located inside the React frontend `src` directory.
**Learning:** Placing backend scripts within the frontend `src` folder is a risky pattern. If these files are accidentally imported by frontend code, the hardcoded credentials could be bundled and leaked to the client.
**Prevention:** Use environment variables for backend scripts (e.g., `DB_PASSWORD`). Crucially, do NOT prefix these variables with `REACT_APP_` to ensure they are never exposed to the client-side bundle.
