
import NonRequests from "@/components/pages/requests/RequestDetail";
import AllRequests from "@/components/pages/requests/AllRequests";


export default function RequestsPage() {

    const data = [1]

    if (data.length === 0) {
        return  <NonRequests />
    }
    return <AllRequests/>
}
