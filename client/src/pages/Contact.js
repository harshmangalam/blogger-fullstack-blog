import {FaFacebook,FaGoogle,FaInstagram,FaTwitter} from "react-icons/fa"
export default function Contact() {
  return (
    <div className="grid bg-gradient-to-br from-purple-400 to-green-500 text-white grid-cols-1 border shadow bg-white sm:grid-cols-2  sm:gap-x-8 md:py-16">
      <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">

        <h2 className="text-xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">
          Harsh Mangalam
        </h2>
      </div>
      <div className="col-start-1 row-start-2 px-4 sm:pb-16">
       
        <hr className="w-16 border-gray-300 hidden sm:block" />
      </div>
      <div className="col-start-1 row-start-3 space-y-3 px-4">
        <div className="space-x-3 flex items-center text-black text-sm font-medium">
          <FaGoogle size="25px" />
          <p>
        
          mangalamharsh78606@gmail.com
        </p>
        </div>
           <div className="flex items-center text-black text-sm font-medium space-x-3">
         <FaFacebook size="25px" />
          <p>
        
         https://twitter.com/harshmangalam
        </p>
        </div>

        <div className="flex items-center text-black text-sm font-medium space-x-3">
         <FaTwitter size="25px" />
          <p>
        
          https://twitter.com/harshmangalam
        </p>
        </div>


        <div className="flex items-center text-black text-sm font-medium space-x-3">
         <FaInstagram size="25px" />
          <p>
        
          https://instagram.com/harshmangalam
        </p>
        </div>

        <button
          type="button"
          className="bg-violet-100 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg"
        >
         Blogger
        </button>
      </div>
      
    </div>
  );
}
