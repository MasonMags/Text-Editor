import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const getDb = async () => {
  const txtEditorDB = await openDB('jate', 1);
  const transVar = txtEditorDB.transaction('jate', 'readwrite')
  const storeVar = transVar.objectStore('jate');
  const req = storeVar.getAll();
  const res = await req;
    
  console.log('res.value', res)
  }

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  const txtEditorDB = await openDB('jate', 1);
  const transVar = txtEditorDB.transaction('jate', 'readwrite');
  const storeVar = transVar.objectStore('jate');
  const req = storeVar.put({id: id, content: content})

  const res = await req;
  console.log('Data saved', res)
}


// TODO: Add logic for a method that gets all the content from the database


initdb();
