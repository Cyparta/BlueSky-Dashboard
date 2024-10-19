'use client';

import { useState } from 'react';
import Image from 'next/image';
import MapGL, { Marker, Popup } from 'react-map-gl';

import InputDemo from '@/components/inputs/Input-demo';

import 'mapbox-gl/dist/mapbox-gl.css';
import AllIcons from '@/lib/all-icons';

export default function Maps({drivers = []}) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [viewport, setViewPort] = useState({
        width: '100%',
        height: '100%',
        zoom: 11,
        longitude: 31.123,
        latitude: 30.208853,
    });

    return (
        <section className="w-full h-[calc(100vh-300px)] overflow-hidden">
            <MapGL
                {...viewport}
                mapStyle='mapbox://styles/mohamedadel158/clxuc3u6300s701qq5rndcqt1'
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                onMove={(nextViewport) =>
                    setViewPort((prev) => {
                        return {
                            ...prev,
                            longitude: nextViewport.viewState.longitude,
                            latitude: nextViewport.viewState.latitude,
                            zoom: nextViewport.viewState.zoom,
                        };
                    })
                }
            >
                {drivers.map((listing) => (
                    <div key={listing.long}>
                        <Marker longitude={listing.long} latitude={listing.lat}>
                            <div
                                onClick={() => setSelectedLocation(listing)}
                                className='animate-bounce w-[40px] h-[40px]'
                            >
                                <Image
                                    src={listing.image}
                                    alt='Driver Image Marker' 
                                    fill
                                    className='rounded-full cursor-pointer object-cover'
                                />
                            </div>
                        </Marker>
                        {selectedLocation?.long === listing.long ? (
                            <Popup
                                closeOnClick={false}
                                onClose={() => setSelectedLocation(null)}
                                longitude={listing.long}
                                latitude={listing.lat}
                            >
                                <form className='flex items-center gap-1'>
                                    <InputDemo
                                        type='text'
                                        id='name'
                                        placeHolder='Enter Your Message'
                                        required
                                        inputStyle='md:col-span-8'
                                    />
                                    <button
                                        type='submit'
                                        className='p-[10px] bg-blue-500 text-white text-lg rounded-md'
                                    >
                                        {AllIcons?.send_icon}
                                    </button>
                                </form>
                            </Popup>
                        ) : null}
                    </div>
                ))}
            </MapGL>
        </section>
    )
}
