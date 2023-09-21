import { ref } from "vue"
import { projectFirestore } from "@/firebase/Config";

const useCollection = (collection) => {
    const error = ref (null)
    const isPending = ref( false)

    // add a new document
    const addDoc = async (doc) => {
        console.log('add')
        error.value = null
        isPending.value = true
        try {
            const res = await projectFirestore.collection(collection).add(doc)
            isPending.value = false
            //um die Doc ID schnell zu erhalten
            return res
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not send the Message'
            isPending.value = false
        }
    }
    return {error, addDoc, isPending}
}

export default useCollection