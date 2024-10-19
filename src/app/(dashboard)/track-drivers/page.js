import Maps from "@/components/Maps/Map";

export default function TrackDriverPage() {
    const drivers = [
        {
            long: 31.123,
            lat: 30.208853,
            image: 'https://as2.ftcdn.net/v2/jpg/02/79/99/21/1000_F_279992144_3GWh4mLIPBacjzlYNc6kZbz2F3KpKOeE.jpg',
        },
        {
            long: 31.023,
            lat: 30.208853,
            image: 'https://as2.ftcdn.net/v2/jpg/02/04/19/45/1000_F_204194571_qDJxELsrRvIrMwUDfBQL01A5OwKiGLNw.jpg',
        }
    ]
    return <Maps drivers={drivers}/>;
}
