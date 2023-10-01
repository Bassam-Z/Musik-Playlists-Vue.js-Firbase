import { ref, watchEffect } from "vue"
import { projectFirestore } from "../firebase/Config.js";

const getCollection = (collection) => {

    const documents = ref (null)
    const error = ref (null)

    // register die firestore collection reference
    let collectionRef = projectFirestore.collection(collection).orderBy('createdAt')

    // wenn Änderung in der Database gibt, wird uns Snapshot davon züruck gegebn
    const unsub = collectionRef.onSnapshot((snap) => {
            let results = []
        snap.docs.forEach(doc => {
            // Echtzeitig daten Zeigen
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
            // muss warten bis der server Timestamp erstellt dann die Data mit der ID in results speichern
            // ohme die richte Seite wird von der snap data züruck in der Braoswr gezwigt ist schneller aber nicht Praxis
            // mit der besden Seiten muss warten bis der server Timestamp erstellt dann an der Browser züruck senden
        })

        // update Documents Values
        documents.value = results
        error.value = null
        
    },(err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })

    watchEffect((onInvalidate) =>{
        //Von der vorherigen Sammlung abmelden, wenn die Überwachung gestoppt wird (Komponente nicht gemountet)
        onInvalidate(() => unsub())
    })

    return { error, documents } 
}

export default getCollection