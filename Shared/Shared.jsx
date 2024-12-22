import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export const GetFavList = async (user) => {
    // Create a reference to the document
    const docRef = doc(db, 'UserFavBook', user?.primaryEmailAddress?.emailAddress);

    // Use getDoc to retrieve a single document
    const docSnap = await getDoc(docRef);

    // Check if the document exists
    if (docSnap.exists()) {
        return docSnap.data(); // Return the document data if it exists
    } else {
        // Create a new document if it doesn't exist
        await setDoc(docRef, {
            email: user?.primaryEmailAddress?.emailAddress,
            favorites: []
        });
        return { email: user?.primaryEmailAddress?.emailAddress, favorites: [] }; // Return the newly created document data
    }
};

const UpdateFav=async(user,favorites)=>{
    const docRef=doc(db,'UserFavBook',user?.primaryEmailAddress?.emailAddress)
    try{
        await updateDoc(docRef,{
            favorites:favorites
        })
    }catch(e){

    }
}
export default {
    GetFavList,
    UpdateFav
};