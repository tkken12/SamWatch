const csvFilePath='./csv/test.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(csvFilePath)
    console.log(jsonObj)
    
})

//const jsonArray = await csv().fromFile(csvFilePath);
