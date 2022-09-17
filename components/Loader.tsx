export const Loader: React.FC = () => {
    return (
        <div className='fixed inset-0 flex flex-col justify-center items-center animate-pulse'>
            <div className='animate-spin h-10 w-10 mr-3 rounded bg-transparent border border-teal-600'></div>
            <h2 className='text-6xl font-light mt-5 '>Loading...</h2>
            <h3 className='text-xl text-center font-light mt-5'>
                Please do not close this page. This may take a few seconds.
            </h3>
        </div>
    )
}
