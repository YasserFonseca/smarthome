## 2024-09-12 - [CRITICAL] Fix hardcoded database credentials
**Vulnerability:** Found hardcoded database credentials (username 'root' and empty password) in smarthome/src/views/admin/smarthome/db.ts.
**Learning:** Hardcoding credentials in source code exposes them to anyone with access to the repository, leading to potential unauthorized database access and data breaches.
**Prevention:** Use environment variables (e.g., process.env.DB_PASSWORD) to securely manage and inject secrets into the application at runtime.