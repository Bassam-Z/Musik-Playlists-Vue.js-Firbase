import { projectStorage } from "@/firebase/Config";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    //ermölicht bei der Playlist Erstellung Bild hochzuladen
    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`;
        const storageRef = projectStorage.ref(filePath.value);
        
        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    //ermöglicht der User beim Playlist löschen auch dazugehörige Bild mit zu löschen
    const deleteImage = async (path) => {
        const storageRef = projectStorage.ref(path)

        try {
            await storageRef.delete(path)
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }


    return { url, filePath, error, uploadImage, deleteImage }
    
}

export default useStorage