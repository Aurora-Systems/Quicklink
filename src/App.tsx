import { FormEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";



function App() {
  const [phoneNumber,setPhoneNumber] = useState("")
  const [message,setMessage] = useState("")
  const [messageList,setMessageList] = useState<Array<{name:string,message:string}>>([])
  const [show,setShow]=useState<boolean>(false)

  const [addData,setAddData]=useState({
    name:"",
    message:""
  })

  const handleSubmit=(e:FormEvent)=>{

  }

  const getData=()=>{
    let data:any = localStorage.getItem("messageList")
    if(data!==null){
      setMessageList(JSON.parse(data))
      console.log(data)
    }
  }


  const AddMessage=(e:FormEvent)=>{
    e.preventDefault()
    let data:any = localStorage.getItem("messageList")
    if(data!==null){
      data = JSON.parse(data)
    }else{
      data = []
    }

    data.push(addData)
    localStorage.setItem("messageList",JSON.stringify(data))
    setAddData({message:"",name:""})
    getData()
  }

  useEffect(()=>{
    getData()
},[])

  return (
    <div className="m-2">
      <div className="row">
        <div className="col-2 p-2 border rounded ms-3 sidebar">
          <div className="d-flex align-content-center align-items-center  justify-content-between w-100 ">
            <div className="">
            <p><b>View Messages</b></p>
            </div>
            <div>
            <button className="btn btn-dark" onClick={()=>setShow(true)}><b>+</b></button>
            </div>  
            
          </div>
          <div mt-3>
            <br/>
              {
                messageList.map((item,index)=>{
                  return(
                    <div className="bg-dark p-2 rounded" key={index} onClick={()=>setMessage(item.message)}>
                      <p>{item.name}</p>
                    </div>
                  )
                })
              }
            </div>   

        </div>
        <div className="col-sm p-2 sidebar">
          <form>
            <div className="row">
              <div className="col-sm w-100 mb-3">
                <input type="tel" className="form-control w-100" placeholder="Phone Number including country code | +263xxxxxxxx" onChange={(e)=>{
                  setPhoneNumber(e.target.value)
                }}/>
              </div>
            </div>
            <div className="row ">
              <div className="col-sm mb-3">
                <textarea className="form-control msgBox" value={message} placeholder="Add the message you want to send to the client" onChange={(e)=>{
                  setMessage(e.target.value)
                }}>
                  
                </textarea>
              </div>
              <div className="row">
                <div className="col-sm">
                  <button type="button" className="btn btn-dark fw-bold">Send</button>
                </div>
              </div>
            </div>

          </form>
        </div>


      </div>
      <Modal show={show}>
        <Modal.Header>
          <h4 className="text-dark">Add Message</h4>
          <p className="text-danger mt-2 pointer" onClick={()=>{
            setShow(false)
          }}>Close</p>
        </Modal.Header>
        <Modal.Body>
         <form onSubmit={(e)=>AddMessage(e)}>
          <div className="row">
            <div className="col-sm mb-3">
              <input className="form-control" type="text" placeholder="Name" value={addData.name} onChange={(e)=>setAddData({...addData,name:e.target.value})}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm mb-3">
              <textarea className="form-control" value={addData.message} onChange={(e)=>setAddData({...addData,message:e.target.value})}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-sm ">
             <button className="rounded btn btn-dark">Save</button>
            </div>
          </div>
         </form>

        </Modal.Body>
      </Modal>

    </div>
  );
}

export default App;
