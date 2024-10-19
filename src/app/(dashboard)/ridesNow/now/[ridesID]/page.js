import { GetSpecifDataInServer } from "@/lib/action";

import RideDetail from "@/components/pages/rides/RideDetail";

const RidesNowDetailsPage = async ({ params: { ridesID } }) => {
    // -------------------- Fetching Client Information in Server --------------------
    const ridesInfo = await GetSpecifDataInServer(`/dashboard/ride/${ridesID}/`);
    return (
        <RideDetail ridesInfo={ridesInfo} />
    );
};

export default RidesNowDetailsPage;