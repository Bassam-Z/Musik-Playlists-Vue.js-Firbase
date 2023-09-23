import { ref, watchEffect } from "vue"
import { projectFirestore } from "../firebase/Config.js";

const getDocument = (collection, id) => {

    const documents = ref (null)
    const error = ref (null)

    // register die firestore collection reference
    let documentRef = projectFirestore.collection(collection).doc(id)

    // wenn Änderung in der Database gibt, wird uns Snapshot davon züruck gegebn
    const unsub = documentRef.onSnapshot(doc => {
        if(doc.data()){
            //... => all doc Inhalte
            documents.value = {...doc.data(), id: doc.id}
            error.value = null
        }else {
            error.value = 'That Document dose not exist'
        }
        
    }, (err) => {
        console.log(err.message)
        error.value = 'could not fetch the Document'
    })

    watchEffect((onInvalidate) =>{
        //Von der vorherigen Sammlung abmelden, wenn die Überwachung gestoppt wird (Komponente nicht gemountet)
        onInvalidate(() => unsub())
    })

    return { error, documents } 
}

export default getDocument