import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private firestore: Firestore) { }

  getClientes(): Observable<any[]> {
    const clientesCollection = collection(this.firestore, 'Clientes');
    return from(getDocs(clientesCollection).then(snapshot => {
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }));
  }
}
