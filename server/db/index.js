const mongoose = require('mongoose');
const URL ='mongodb+srv://daniyalwaseem0808:9AHcRoEjov6defwP@chattapplication.bdiqcux.mongodb.net/?retryWrites=true&w=majority&appName=ChattApplication'
mongoose.connect(URL)
.then(()=>{
console.log('Connected to mongoDB Successfully')
})
.catch((e)=>{
 console.log('Error',e);
})