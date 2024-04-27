export const databaseConfig = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,

  database: process.env.TYPEORM_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
};
