## 2026-09-20 - [Sentinel] Fix hardcoded database credentials
**Vulnerability:** Hardcoded root credentials ('root' user, '' password) for database in smarthome/src/views/admin/smarthome/db.ts expose database access.
**Learning:** The database setup script contains default/hardcoded access credentials for convenience but this will expose it directly if committed or deployed without checks. Always utilize process.env variables as a first line of defense rather than defaults.
**Prevention:** Utilize process.env.* for setting configurations like connection strings, and implement checks to forbid simple or default credentials in codebase.
