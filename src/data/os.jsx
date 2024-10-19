
const operatingSystem = (os) => {

    const calculatePercent = (value) => {
        const total = os?.ios_users + os?.android_users + os?.web_users;
        return ((value / total) * 100).toFixed(2) + "%";
    }

    const ALLOperatingSystemDevice = [
        {
            id:1,
            img: "/iOS.png",
            categpry: "Mobile & Tablet",
            type: "iOS",
            percent: calculatePercent(os?.ios_users),
            totalUser: os?.ios_users
        },
        {
            id:2,
            img: "/Android.png",
            categpry: "Mobile & Tablet",
            type: "Android",
            percent: calculatePercent(os?.android_users),
            totalUser: os?.android_users
        },
        {
            id:3,
            img: "/Windows.png",
            categpry: "Computer & Laptop",
            type: "PC",
            percent: calculatePercent(os?.web_users),
            totalUser: os?.web_users
        }
    ]


    return {ALLOperatingSystemDevice}

};

export default operatingSystem