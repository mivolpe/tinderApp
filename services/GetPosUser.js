class GetPosUser {
    async getDataUrl (){
        const response = await fetch('https://api.ipify.org/?format=json');
        const json = await response.json();
        const location = await fetch("http://ip-api.com/json/"+json.ip,{
            method: "GET",
        })
        const locationJSON =  await location.json()
        return locationJSON
    };
}
export default new GetPosUser();