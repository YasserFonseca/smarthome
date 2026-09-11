## 2024-05-18 - Hardcoded DB Credentials & Plaintext Passwords
**Vulnerability:** Found hardcoded database credentials in `db.ts` and plaintext passwords in `insertData.js`.
**Learning:** Hardcoding credentials exposes sensitive information and plaintext passwords compromise user security if the database is breached.
**Prevention:** Use environment variables for sensitive configuration data and hash passwords using strong algorithms like bcrypt before storing them.
