first 
 
    
    const keyWord = req.query.search  ? {
        $or : [
            {username : {$regex : req.query.search,$options:'i'}},
            {email : {$regex : req.query.search,$options:'i'}}
        ]
    }: {}

     const funcdata = await User.find(
        {...keyWord,
        _id:{$ne : req.body.currentid}})
        
   )
# options

const [name,setName] = useState("")
const HandelFunction  =(event)=>{
console.log(event.target.value)

}
<Search passFunction = {HandelFunction}/>


inside comp Serch  

cosnt Search = ({passFunction})


const HandelChange  = (e)=>{
           passFunction(e.traget.value)

}
<input onChange = {(e)=>HandelChange))
and this awomse

 
