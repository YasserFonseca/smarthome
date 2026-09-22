## 2024-05-31 - [CRITICAL] Fix hardcoded database credentials
**Vulnerability:** Hardcoded MySQL database credentials (user, password) were found in the source code (`smarthome/src/views/admin/smarthome/db.ts`). This allows anyone with access to the source code to potentially access or modify the database.
**Learning:** Development configurations often get committed to the repository if not managed properly. Even local or default credentials shouldn't be hardcoded to prevent accidental leaks.
**Prevention:** Always use environment variables for sensitive data like credentials, API keys, and connection strings. Ensure the environment variables used by backend scripts in a frontend project are not prefixed with `REACT_APP_` to avoid leaking them into the client bundle.
