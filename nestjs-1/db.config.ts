import { Property } from "src/entities/property.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const PgConfig:PostgresConnectionOptions = {
    url: "postgresql://neon_db_owner:n9ELaXTNU4ou@ep-soft-paper-a5bxs8ke.us-east-2.aws.neon.tech/neon_db?sslmode=require",
    type: "postgres",
    port: 5432,
    entities:[__dirname + "/**/*.entity.{ts,js}"],
    synchronize: true,
}