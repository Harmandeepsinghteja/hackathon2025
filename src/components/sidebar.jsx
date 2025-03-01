import { useRouter } from 'next/navigation';

export default function Sidebar(){
    const router = useRouter(); 
    return(
        <div
        className="flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center min-h-screen bg-gray-100"
        style={{ backgroundImage: "url('/home_tree.jpg')" }}
      >
             
            <div className="items-center justify-start max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
                <h1 className="text-gray-900 text-3xl  font-bold text-center mb-6">What would you like to do?</h1>
                
                <ul className='flex justify-center space-x-3'>
                <li>
                        <button onClick={() => router.push("/questionnaire")}
                             className="text-green-500 bg-transparent border-2 border-green-500 rounded-md px-4 py-2 hover:bg-green-500 hover:text-white transition-colors">
                             Review Answers
                        </button>
                    </li>
                     <li>
                        <button onClick={()=> router.push("/ai-questionnaire")}
                             className="text-green-500 bg-transparent border-2 border-green-500 rounded-md px-4 py-2 hover:bg-green-500 hover:text-white transition-colors">
                                Let's Chat(AI)
                         </button>
                    </li>
                    <li>
                        <button onClick={() => router.push("/upload-image")}
                             className="text-green-500 bg-transparent border-2 border-green-500 rounded-md px-4 py-2 hover:bg-green-500 hover:text-white transition-colors">
                                Upload Images
                         </button>
                    </li>
                    <li>
                        <button onClick={() => router.push("/summary")}
                             className="text-green-500 bg-transparent border-2 border-green-500 rounded-md px-4 py-2 hover:bg-green-500 hover:text-white transition-colors">
                             Summmarize Your Life
                        </button>
                    </li>
                </ul>
            </div>
        </div>

    )
}