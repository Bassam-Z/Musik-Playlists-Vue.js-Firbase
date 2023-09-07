import { ref, watchEffect } from "vue"
import { projectFirestore } from "../firebase/Config.js";

const getCollection = (collection) => {

    const documents = ref (null)
    const error = ref (null)

    // register die firestore collection reference
    let collectionRef = projectFirestore.collection(collection).orderBy('createdAt')

    const unsub = collectionRef.onSnapshot((snap) => {
            let results = []
        snap.docs.forEach(doc => {
            // muss warten bis der server Timestamp erstellt und sendet es zurück
            doc.data().createdAt &&  results.push({...doc.data(), id: doc.id})
        })

        // update Values
        documents.value = results
        error.value = null
    }, (err) => {
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