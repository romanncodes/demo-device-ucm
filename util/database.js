
export async function migrateDbIfNeeded(db) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await db.getFirstAsync('PRAGMA user_version');
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      await db.execAsync(`
            PRAGMA journal_mode = 'wal';
            CREATE TABLE IF NOT EXISTS 
            test (
                id INTEGER AUTOINCREMENT PRIMARY KEY  NOT NULL, 
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL);
  `);
     
      currentDbVersion = 2;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }

