import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource } from 'typeorm';

// when using Capacitor, you might want to close existing connections, 
// otherwise new connections will fail when using dev-live-reload
// see https://github.com/capacitor-community/sqlite/issues/106
const pSqliteConsistent = CapacitorSQLite.checkConnectionsConsistency({
  dbNames: ['DBTEST'], // i.e. "i expect no connections to be open"
  openModes: ['RW']
}).catch((e) => {
  // the plugin throws an error when closing connections. we can ignore
  // that since it is expected behaviour
  console.log(e);
  return {};
});

// create a SQLite Connection Wrapper
const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

// copy preloaded dbs (optional, not TypeORM related):
// the preloaded dbs must have the `YOUR_DB_NAME.db` format (i.e. including 
// the `.db` suffix, NOT including the internal `SQLITE` suffix from the plugin)
const copp = async function(){
    return await sqliteConnection.copyFromAssets();
}

// create the TypeORM connection
// For more information see https://typeorm.io/data-source#creating-a-new-datasource
const AppDataSource = new DataSource({
  type: 'capacitor',
  driver: sqliteConnection, // pass the connection wrapper here
  database: 'DBTEST' // database name without the `.db` suffix
});


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

async function initDb(){
    try {

        await AppDataSource.query("CREATE TABLE IF NOT EXISTS USERS (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING(255), email STRING(255))");

        await AppDataSource.query("CREATE TABLE IF NOT EXISTS `product_cache` (`id` integer not null primary key autoincrement,      `created_at` datetime not null default CURRENT_TIMESTAMP,`product_id` VARCHAR(255) null,`product_data` TEXT null,          `status` TINYINT null)");

        await AppDataSource.query("CREATE TABLE IF NOT EXISTS `order_cache` (`id` integer not null primary key autoincrement,`created_at` datetime not null default CURRENT_TIMESTAMP,`order_id` varchar(255) null,`items` TEXT null,`is_sync` TINYINT null,`order_status` TINYINT null,`total_order` DECIMAL null)");

    } catch (error) {
        console.log(error)
    }
}

initDb();
export default AppDataSource;
    