import TreeBuilder from "./components/TreeBuilder";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { NodeInterface, url } from "./utils/constants";

export default function App() {
  const [sendingJsonFile, setSendingJsonFile] = useState<File | null>(null);
  const [treeNodes, setTreeNodes] = useState<NodeInterface[] | undefined>()

  async function uploadJsonFile() {
    if(sendingJsonFile === null){      
      toast.error("cannot send empty file")
    } else {
      try {
        const formData = new FormData();
        formData.append("file", sendingJsonFile)

        const response = await fetch(url + "upload", {
          method: "POST",
          body: formData
        })
        
        const result = await response.json()

        if(result.message === "false data sent"){
          toast.error("Data Validation Failed")
        } else if( result.message === "data saved successfully"){
          toast.success("data sent")
          fetchTreeData()
        }

        
        console.log(result.message);
        

      } catch (error) {
        toast.error("Something Went Wrong Try Again")
      }

    }
  }

  async function fetchTreeData(){
    try {
      const response = await fetch(url + "home")

      const result = await response.json()
      
      if(result.message === "No data available"){
        toast.error("No data available to showcase")
      } else {
        setTreeNodes(result)
      }
      

    } catch (error) {
      toast.error("fetch error")
    }
  }

  useEffect(() => {
    fetchTreeData()
  },[])

  return (
    <>
    <div><Toaster/></div>
      <div className="p-5 border border-black m-1 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <div className="bg-slate-500 rounded-md h-screen shadow-[3px_-7px_20px_1px_#a0aec0] p-5">
          <div className="p-3 mb-10 border-2 border-gray-900 flex justify-center rounded-md">
            <div className="grid gap-1">
              <div>
                <input
                  className="border-2 rounded-md text-white font-bold hover:cursor-pointer"
                  type="file"
                  accept=".json"
                  onChange={(e) => setSendingJsonFile(e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div className=" flex justify-center">
                <button className="border bg-white hover:cursor-pointer font-bold text-black rounded-md p-1" onClick={() => uploadJsonFile()}>SEND</button>
              </div>
            </div>
          </div>
          <div className="p-1 grid">
            <div className="flex justify-center">
              <span className="font-bold text-white">Rendered Tree</span>
            </div>
            <br />
            <div>
              {
                treeNodes ? 
                <TreeBuilder nodes={treeNodes}></TreeBuilder> :
                <div className="flex justify-center">
                  <span className=" text-red-600">*</span><span className="text-white font-medium">No Data Available</span>
                </div>

              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
