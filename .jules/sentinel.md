## 2024-05-18 - Hardcoded DB Credentials
**Vulnerability:** Hardcoded DB credentials found in a database configuration file (`smarthome/src/views/admin/smarthome/db.ts`).
**Learning:** Configurations for database connections should be provided through environment variables to avoid exposing credentials if the code is pushed to a repository.
**Prevention:** Use `process.env` to supply values like host, user, password, and database. Provide local development defaults when appropriate using the OR operator `||`.
