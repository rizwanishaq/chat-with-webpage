import ChatWrapper from "@/components/ChatWrapper"
import { ragChat } from "@/lib/rag-chat"
import { redis } from "@/lib/redis"
import { cookies } from "next/headers"



const reconstructUrl = ({url})  => {
    const decodedComponents = url.map((component) => decodeURIComponent(component))
    return decodedComponents.join("/")
}

const page = async ({params}) => {
    const sessionCookie = cookies().get("sessionId")?.value
    const reconstructedUrl = reconstructUrl({url: params.url})


    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)
    
    const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "")
    
    
    const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId })
    
    if (!isAlreadyIndexed) {
        await ragChat.context.add({
          type: "html",
          source: reconstructedUrl,
          config: { chunkOverlap: 50, chunkSize: 200 },
        })
    
        await redis.sadd("indexed-urls", reconstructedUrl)
      }


  return (
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
  )
}

export default page