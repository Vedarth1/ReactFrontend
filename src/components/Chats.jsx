import React  from "react";

function Chats(props){
    const { sender, message } = props.message;

    const colorClassName = sender === "user" ? "bg-sky-600" : "bg-slate-50 text-black";
    const alignmentClassName = sender === "user" ? "ml-auto" : "mr-auto";
    const prefix = sender === "user" ? "🧑" : "🤖";
    return(
        <>
            <div className={`${alignmentClassName} ${colorClassName} rounded px-4 py-2 max-w-[80%] mb-8 flex flex-col`}>
                <div className="flex hover:group group">
                    <div className="mr-2"> {prefix} </div>
                    <div className="whitespace-pre-wrap">
                        {message}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chats;