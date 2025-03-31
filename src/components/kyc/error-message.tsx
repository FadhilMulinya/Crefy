import { X } from "lucide-react"

interface ErrorMessageProps {
    message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) return null

    return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center">
            <X className="text-red-400 mr-2" size={16} />
            <p className="text-sm text-red-400">{message}</p>
        </div>
    )
}

export default ErrorMessage

