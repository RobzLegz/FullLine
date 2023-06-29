import * as SQLite from "expo-sqlite";

export class Db {
    private db: SQLite.WebSQLDatabase

    constructor() {
        this.db = SQLite.openDatabase("lifecoach.db");

        this.execAndReturnSql(
            `CREATE TABLE IF NOT EXISTS images (
                id INTEGER PRIMARY KEY,
                source TEXT
            );
            
            CREATE TABLE IF NOT EXISTS category (
                id INTEGER PRIMARY KEY,
                name TEXT
            );
            
            CREATE TABLE IF NOT EXISTS image_category (
                image_id INTEGER,
                category_id INTEGER,
                FOREIGN KEY (image_id) REFERENCES images(id),
                FOREIGN KEY (category_id) REFERENCES category(id),
                PRIMARY KEY (image_id, category_id)
            );

            INSERT INTO category (name)
            SELECT 'Confidence'
            WHERE NOT EXISTS (SELECT 1 FROM category WHERE name = 'Confidence');

            INSERT INTO category (name)
            SELECT 'Goal'
            WHERE NOT EXISTS (SELECT 1 FROM category WHERE name = 'Goal');

            INSERT INTO category (name)
            SELECT 'Purpose'
            WHERE NOT EXISTS (SELECT 1 FROM category WHERE name = 'Purpose');
            `     
        );
    }

    private execSql(query: string) {
        this.db.transaction((tx) => {
            tx.executeSql(query);
          });
    }

    private execAndReturnSql(query: string) {
        let x;
        this.db.transaction((tx) => {
            tx.executeSql(query, [], (a, { rows }) => x = rows);
        });

        return x;
    }

    public getImages() {
        const prikol = this.execAndReturnSql(`
            SELECT images.id AS image_id, images.source, image_category.category_id
            FROM images
            LEFT JOIN image_category ON images.id = image_category.image_id;
        `)
        return prikol;
    }

    public getCategories() {
        const prikol = this.execAndReturnSql(`
            SELECT * from category;
        `)
        return prikol;
    }

    public countImages() {
        const prikol = this.execAndReturnSql(`
            SELECT COUNT(*) AS image_count
            FROM images;
        `)
        return prikol;
    }

    public countImagesInCategories() {
        const kkas: any = this.getCategories();
        for (const cat in kkas) {

        }

        const prikol = this.execAndReturnSql(`
            SELECT COUNT(*) AS image_count
            FROM images
            JOIN image_category ON images.id = image_category.image_id
            JOIN category ON image_category.category_id = category.id
            WHERE category.name = 'your_category_name';
        `)
        return prikol;
    }

    public addImage(src: string, cats: number[]) {
        this.db.transaction((tx) => {
            tx.executeSql(`
                INSERT INTO images (source)
                VALUES ('${src}');
            `);

            let img_id: number | undefined;
            tx.executeSql(`SELECT last_insert_rowid();`, [], (x, { insertId }) => img_id = insertId);

            if (!img_id) {
                throw new Error("Failed writing to db.")
            }

            for (const cat in cats) {
                tx.executeSql(`
                    INSERT INTO image_category (image_id, category_id)
                    VALUES (${img_id.toString()}, ${cat});
                `);
            }        
        });
    }

    public getImagesInCategory(cat: number) {
        const prikol = this.execAndReturnSql(`
            SELECT images.id, images.source
            FROM images
            JOIN image_category ON images.id = image_category.image_id
            JOIN category ON image_category.category_id = category.id
            WHERE category.name = 'your_category_name';
        `)

        return prikol;
    }

}


