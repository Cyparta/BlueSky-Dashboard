import AllIcons from '@/lib/all-icons';

const TrackingLoading = () => {
    return (
        <div className='animate-spin text-blue-600 w-full h-screen flex items-center justify-center'>
            {AllIcons?.loading_icon}
        </div>
    );
};

export default TrackingLoading;