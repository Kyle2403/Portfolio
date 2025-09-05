export const dynamic = 'force-dynamic';
import BreadCrumbs from "../components/BreadCrumbs";
import Link from "next/link"
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
const SessionHistory = async () => {
    let sessions: GameSession[] = [];
    const backendUrl =  process.env.BACKEND_URL || "http://localhost:5271";
    const res = await fetch(`${backendUrl}/session/`);
    sessions = await res.json();
    return (
        <div className="flex flex-col min-h-screen">
            <NavigationBar></NavigationBar>
            <BreadCrumbs links={[{text: "Sessions", href:""}]}></BreadCrumbs>
            <div className="px-6 pt-3 flex-grow">
                <h1 className="text-xl font-black mb-4 text-white">Session History</h1>
                <div className="grid grid-cols-2  gap-4">
                    {sessions.filter(s => s.isDone).sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
                    .map((session) => (
                    <Link href={`/sessions/${session.gameSessionId}/details`} key={session.gameSessionId} className="rounded-xl shadow-md p-4 bg-white text-xl hover:bg-gray-100">
                        <div className="flex justify-between">
                            <p className="font-medium">{session.gameName}</p>
                            
                            <span
                                className={`px-2 py-1 rounded ${
                                    session.isDone
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-300 text-black-700"
                                }`}
                            >
                                {session.isDone ? <div className="">Completed by <span className="italic font-bold">{session.playerName}</span></div> : "Aborted by player"}
                            </span>
                        </div>
                        <p className="text-gray-600 text-md mt-1">{new Date(session.startTime).toLocaleString()}</p>
                        <div className="mt-2 flex gap-6">
                        <p>✅ {session.scoreCorrect}</p>
                        <p>❌ {session.scoreIncorrect}</p>
                        <p>⏱ {(session.duration)} s</p>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
            <Footer></Footer>

        </div>
        
    )
}

export default SessionHistory
