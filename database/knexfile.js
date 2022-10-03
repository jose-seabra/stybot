import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    development: {
        client: "sqlite",
        connection: {
            filename: path.join(__dirname, "db.sqlite3"),
        },
        migrations: {
            tableName: "knex_migrations",
        },
        useNullAsDefault: true,
    },
    production: {
        client: "pg",
        connection: process.env.PG_CONNECTION_STRING,
        migrations: {
            tableName: "knex_migrations",
        },
    },
}
