import { useEffect, useState } from "react";
import daniyal from "../../../src/Daniyal.png";
import Input from "../../components/Input";
const DashBoard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [messagesData, setMessagesData] = useState({
    messages: [],
    receiver: null,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:5000/api/Users/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();
      setUsers(resData);
    };
    fetchUsers();
  }, []);



  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch(
        `http://localhost:5000/api/getConversation/${user.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const resData = await res.json();
      setConversations(resData);
    };

    fetchConversations();
  }, [user.id]);

  const fetchMessages = async (conversationId, receiver) => {
    const res = await fetch(
      `http://localhost:5000/api/message/${conversationId}?senderId=${user.id}&receiverId=${receiver.userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const resData = await res.json();
    setMessagesData({ messages: resData, receiver, conversationId });
  };

  const sendMessage = async (e) => {
    const res = await fetch("http://localhost:5000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messagesData.conversationId,
        senderId: user.id,
        message,
        receiverId: messagesData.receiver.userId,
      }),
    });
    setMessage("");
  };
  

  return (
    <div className="w-screen flex fixed">
      <div className="w-[25%] h-screen bg-secondary overflow-y-auto no-scrollbar">
        <div className="flex ml-3 items-center my-8">
          <div className="border-2 border-primary h-28 w-28 p-2 rounded-full flex justify-center items-center">
            <img src={daniyal} width={60} height={60} alt="User Avatar" />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">{user.fullName}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>

        <hr />
        <div className="mx-3 mt-10">
          <div className="text-primary text-lg">Messages</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => (
                <div
                  key={conversationId}
                  className="flex items-center py-8 border-b border-b-gray-300 cursor-pointer"
                  onClick={() => fetchMessages(conversationId, user)}
                >
                  <div className="border border-primary w-20 h-20 flex justify-center items-center p-3 rounded-full">
                    <img
                      src={daniyal}
                      width={40}
                      height={40}
                      alt="User Avatar"
                    />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg">{user.fullName}</h3>
                    <p className="text-sm font-light text-gray-600">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold mt-4">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        {messagesData.receiver?.fullName && (
          <div className="mt-3 w-[75%] bg-secondary h-[80px] my-10 rounded-full flex items-center px-14 border-gray-800">
            <div className="h-[64px] w-16 flex justify-center items-center p-2 border-primary border rounded-full">
              <img src={daniyal} width={40} height={40} alt="Receiver Avatar" />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg">{messagesData.receiver?.fullName}</h3>
              <p className="text-sm font-light text-gray-600">
                {messagesData.receiver?.email}
              </p>
            </div>
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-phone-outgoing"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 9l5 -5" />
                <path d="M16 4l4 0l0 4" />
              </svg>
            </div>
          </div>
        )}
        <div className="h-[75%] w-full overflow-y-auto no-scrollbar shadow-sm">
          <div className="px-10 py-14">
            {messagesData.messages.length > 0 ? (
              messagesData.messages.map(({ message, user: { id } }) => (
                <div
                  key={message}
                  className={`rounded-b-xl h-fit p-2 max-w-[44%] mb-6 ${
                    id === user.id
                      ? "rounded-tr-xl bg-primary ml-auto text-white"
                      : "rounded-tl-xl bg-secondary"
                  }`}
                >
                  {message}
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Messages
              </div>
            )}
          </div>
        </div>

        <div className="py-6 px-3 w-full flex items-center">
          <Input
            className="w-11/12 mr-auto"
            inputclassName="border-none rounded-full shadow-lg focus:ring-0 focus:border-none outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div
            className={`${!message ? "pointer-events-none" : "cursor-pointer"}`}
            onClick={() => sendMessage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-send"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[25%] h-screen overflow-y-auto no-scrollbar">
        <div className=" text-primary text-lg">Contacts</div>
        {users.length > 0 ? (
          users.map(({ conversationId, user }) => (
            <div
              key={conversationId}
              className="flex items-center py-8 border-b border-b-gray-300 cursor-pointer"
              onClick={() => fetchMessages(conversationId, user)}
            >
              <div className="border border-primary w-14 h-14 flex justify-center items-center  rounded-full">
                <img src={daniyal} width={30} height={30} alt="User Avatar" />
              </div>
              <div className="ml-6">
                <h3 className="text-lg text-wrap">{user.fullName}</h3>
                <p className="text-sm font-light text-gray-600">{user.email}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg font-semibold mt-4">
            No Contacts
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
