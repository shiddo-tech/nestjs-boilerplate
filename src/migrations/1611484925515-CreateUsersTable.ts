import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1611484925515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE USERS
       (
           ID         SERIAL PRIMARY KEY,
           FIRST_NAME VARCHAR(255) NOT NULL,
           LAST_NAME  VARCHAR(255) NOT NULL,
           EMAIL      VARCHAR(255) NOT NULL,
           PASSWORD   VARCHAR(255) NOT NULL
       );

      ALTER TABLE USERS
          OWNER TO POSTGRES;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users;`);
  }
}
