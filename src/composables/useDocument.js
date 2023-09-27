import { ref } from "vue"
import { projectFirestore } from "@/firebase/Config";

const useDocument = (collection, id) => {
    let error = ref(null)
    let isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)

    const deleteDoc = async () => {
        isPending.value = true;
        error.value = null;
        
        try {
            const res = await docRef.delete()
            isPending.value = false;
            return res
            
        } catch (err) {
            console.log(err.message)
            isPending.value = false;
            isPending.value = 'could not delete the document'
        }
    }


    return { error, isPending, deleteDoc}
}

export default useDocument