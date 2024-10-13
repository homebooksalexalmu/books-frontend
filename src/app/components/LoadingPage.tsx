import { CircularProgress } from "@nextui-org/react"

const LoadingPage = () => {

    return (
        <div className="w-full h-screen flex flex-row justify-center items-center">
            <CircularProgress aria-label="Loading..." />
        </div>
    )
}

export default LoadingPage;