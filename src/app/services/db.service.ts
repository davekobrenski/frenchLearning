import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private afs: AngularFirestore) { }

  collection$(path, query?) {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  collectionShare$(path, query?) {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data();
            return { id, ...data };
          });
        }),
        shareReplay(1)
      );
  }

  doc$(path): Observable<any> {
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }
}
