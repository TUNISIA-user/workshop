   const handleInputChange = useCallback(
    _.debounce(async (value) => {
      setinput(value);
      const { data } = await axios.get(`/get/accesUser?search=${value}`, {
        currentid: TokenUser?._id,
      });
      console.log(data);
    }, 300),
    []
  );




// this methode waiting all api request in my web site 

const GetReallChat = async () => {
  setlodaing(true);
  try {
    const [messageResponse, anotherAPIResponse] = await Promise.all([
      axios.post(`/get/access/message/${TokenUser?._id}`, { userId: currentUser[0]._id }),
      axios.post('/another/api/endpoint', { /* params */ })
    ]);

    // Set both results in the state or process as needed
    setMessages(messageResponse.data.messages);
    // Handle other response

    setlodaing(false);
  } catch (error) {
    console.log(error, "<==");
    setlodaing(false);
  }
};







import React, { useEffect, useState } from 'react'
import "./reallChat.css"
import { Avatar, AvatarBadge } from '@chakra-ui/react'
import { useGlobalContext } from '../Store/GlobalContext'
import axios from '../Component/axios'

const ReallChat = () => {
  const { currentUser, TokenUser } = useGlobalContext()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortedMessages, setSortedMessages] = useState([])

  // Sending a message
  const handleSender = async () => {
    setLoading(true)
    try {
      await axios.post(`/accesMessage/${TokenUser._id}`, {
        userId: currentUser[0]._id,
        txt: input
      })
      setLoading(false)
      setInput('') // Clear input after sending
      getRealChat() // Fetch updated messages
    } catch (error) {
      console.log(`Error occurred: ${error}`)
    }
  }

  // Fetching the chat messages
  const getRealChat = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(`/get/access/message/${TokenUser?._id}`, {
        userId: currentUser[0]._id
      })
      setMessages(data.messages)
      setLoading(false)
    } catch (error) {
      console.log(`Error occurred: ${error}`)
    }
  }

   const sorted  = [...messages].sort((a,b)=>b-a) dont forget new date
  // Sorting the messages based on timestamp whenever `messages` state changes
  useEffect(() => {
    const sorted = [...messages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    setSortedMessages(sorted)
  }, [messages])

  return (
    <div className='reallchat'>
      <div className='container--reallchat'>
        <div className='chatPage'>
          <div className='card-wrapp--acountx'>
            <div className='itemcards'>
              <Avatar name='Ghaith Nahdi' size='md' src='https://avatars.githubusercontent.com/u/810438?v=4'>
                <AvatarBadge boxSize='18px' bg={loading ? 'green.500' : 'red.500'} />
              </Avatar>
              <div className='left--card-account1'>
                <h2 style={{ color: "white" }}> Ghaith. 6 h</h2>
                <p style={{ color: "grey" }}>@nahdi@gmail.com</p>
                <p className='messageme' style={{ color: "white" }}>Last seen 6m ago</p>
              </div>
            </div>

            <div className='user-info-chat-block' style={{ color: "white" }}>...</div>
          </div>

          <div className='scrennMessage'>
            {
              sortedMessages.length > 0 ? (
                sortedMessages.map(item => (
                  <p key={item._id}   className={item.senderId===TokenUser._id?"current":"diffcurrent"}>
                    {item.content}
                  </p>
                ))
              ) : (
                <p style={{ color: "grey" }}>No messages yet...</p>
              )
            }
          </div>

          <div className='submitMessages' style={{ display: "flex", alignItems: "center" }}>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: "80%", fontWeight: "bold", fontSize: "19px" }}
            />
            <button
              style={{ backgroundColor: "white", width: "80px", height: "45px", cursor: "pointer", marginLeft: "10px", fontWeight: 'bold', borderRadius: "100px" }}
              onClick={handleSender}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReallChat


