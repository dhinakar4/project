import { HiLightBulb } from "react-icons/hi";
import { IoHeartSharp } from "react-icons/io5";
import { BsFillBagCheckFill } from "react-icons/bs";
import './DownloadApp.css'


function DownloadApp() {

    

    return (
        <div>
            <div className="app-download h-[400px] w-[100%]">
                <h5 className="ml-[80px] pt-5" style={{ fontSize: '22px' }}>
                    Download The WedMeGood Mobile App Today!
                </h5>
                <div>
                    <div className="d-flex ml-[80px] icon-colors mt-3" >
                        <i><HiLightBulb size={24} /> </i>
                        <p className="ms-1">Save Wedding Ideas</p>
                        <i><IoHeartSharp className="ms-4 mt-1" size={22} /></i>
                        <p className="ms-1">Shortlist Vendors</p>
                        <i><BsFillBagCheckFill className="ms-4 rotate-350 mt-1 text-pink" size={18} /></i>
                        <p className="ms-1">Getting Free Wedding Checklist</p>
                    </div>
                    <p className="ml-[80px] mt-4 font-semibold">You will receive an SMS with a link to download the App</p>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md w-[280px]">
                        <span className="text-gray-600">+91</span>
                        <input
                            type="tel"
                            maxLength={10}
                            onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                            className="border-b border-gray-500 w-[250px] py-2 focus:outline-none focus:border-pink-500"
                        />

                    </div>

                </div>
            </div>
        </div>
    )
}; export default DownloadApp;