import {doc, setDoc} from "@firebase/firestore";
import {db} from "../firebase";


class RequestUser{
    async getUser(){
        const response = await fetch("https://randomuser.me/api/?results=2&password=upper,lower,6-16");
        const responseJson = await response.json();
        responseJson.results.forEach(result => {
            setDoc(doc(db,"users", result.login.uuid ), {
                displayName : result.name.first,
                id : result.login.uuid,
                place : result.location.city,
                lat : result.location.coordinates.latitude,
                lon : result.location.coordinates.longitude,
                age : result.dob.age,
                photoUrl : result.picture.large,
                password : result.login.password
            })
        })
    }
}

export default new RequestUser();