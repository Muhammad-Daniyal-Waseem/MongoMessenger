import daniyal from "../../../src/Daniyal.png";
import Input from "../../components/Input"
const DashBoard = () => {
  const constacts = [
    {
      name: "Daniyal",
      status: "Available",
      img: daniyal,
    },
    {
      name: "Khizar",
      status: "Not Available",
      img: daniyal,
    },
    {
      name: "Umar",
      status: "Available",
      img: daniyal,
    },
    {
      name: "RabiuDin",
      status: "Available",
      img: daniyal,
    },
    {
      name: "Huzaifa",
      status: "Not Available",
      img: daniyal,
    },
    {
      name: "Rayyan",
      status: "Available",
      img: daniyal,
    },
  ];

  return (
    <div className=" w-screen flex  fixed">
      <div className=" w-[25%] h-screen  bg-secondary overflow-y-auto no-scrollbar">
        <div className=" flex ml-3 items-center my-8">
          <div className=" border-2 border-primary h-28 w-28 p-2 rounded-full flex justify-center items-center">
            <img src={daniyal} width={60} height={60}></img>
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">Tutorials Dev </h3>
            <p className="text-lg font-light"> My Account </p>
          </div>
        </div>

        <hr></hr>
        <div className=" mx-3 mt-10">
          <div className=" text-primary text-lg">Messages</div>
          <div>
            {constacts.map(({ name, status, img }) => {
              return (
                <div className=" flex items-center py-8 border-b border-b-gray-300 cursor-pointer">
                  <div className=" border border-primary w-20 h-20 flex justify-center items-center p-3 rounded-full">
                    <img src={img} width={40} height={40}></img>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg">{name} </h3>
                    <p className="text-sm font-light text-gray-600">
                      {status}{" "}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className=" w-[50%] h-screen bg-white flex flex-col items-center">
        <div className="mt-3  w-[75%] bg-secondary h-[80px] my-10 rounded-full flex items-center px-14 ">
          <div className=' h-[64px] w-16 flex justify-center items-center  p-3 border-primary border rounded-full'>
            <img src={daniyal} width={40} height={40}></img>
          </div>
          <div className=' ml-6 mr-auto'>
          <h3 className="text-lg">Daniyal</h3>
          <p className=' text-sm font-light text-gray-600'>online</p>
          </div>
          <div className=' cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
  <path d="M15 9l5 -5" />
  <path d="M16 4l4 0l0 4" />
</svg>
          </div>
        </div>
        <div className=' h-[75%]  w-full  overflow-y-auto no-scrollbar shadow-sm'>
            <div className='px-10 py-14'>
                <div className=' rounded-b-xl rounded-tr-xl h-fit p-2 max-w-[44%] bg-secondary mb-6'>
                    This is First Message.
                </div>
                <div className=' rounded-b-xl rounded-tl-xl h-fit p-2 max-w-[44%] bg-primary ml-auto text-white mb-6'>
                This is First Message.This message is typed long to check
                that how it will looked in chat after send using this messenger
                app moreover to evaluate the presenting design of message in DM. 
                </div>
                <div className=' rounded-b-xl rounded-tr-xl h-fit p-2 max-w-[44%] bg-secondary mb-6'>
                    This is Second Message.
                </div>
                <div className=' rounded-b-xl rounded-tl-xl h-fit p-2 max-w-[44%] bg-primary ml-auto text-white mb-6'>
                This is Second Message.This message is typed long to check
                that how it will looked in chat after send using this messenger
                app moreover to evaluate the presenting design of message in DM. 
                </div>
                <div className=' rounded-b-xl rounded-tr-xl h-fit p-2 max-w-[44%] bg-secondary mb-6'>
                    This is Third Message.
                </div>
                <div className=' rounded-b-xl rounded-tl-xl h-fit p-2 max-w-[44%] bg-primary ml-auto text-white mb-6'>
                This is Third Message.This message is typed long to check
                that how it will looked in chat after send using this messenger
                app moreover to evaluate the presenting design of message in DM. 
                </div>
            </div>
        </div>
        <div className='py-6 px-3 w-full flex items-center '>
     <Input className=" w-11/12 mr-auto" inputclassName="border-none rounded-full shadow-lg focus:ring-0 focus:border-none outline-none" placeholder="Type a message..."></Input>
  <div className=" cursor-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 14l11 -11" />
  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
</svg>
  </div>
      </div>
      </div>
      <div className=" w-[25%] h-screen"></div>
    </div>
  );
};

export default DashBoard;
