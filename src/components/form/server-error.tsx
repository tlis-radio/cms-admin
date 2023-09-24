const getErrorMessage = (error: unknown): string => {
    if (typeof error === "string")
    {
        return error;
    }

    if (error instanceof Error)
    {
        return error.message;
    }

    return "Unknown error";
};

type ServerErrorProps = {
    error: unknown;
};

const ServerError: React.FC<ServerErrorProps> = ({ error }) => {
    return (
        <div className="boder-2 border-red-600 bg-red-400 rounded-md flex items-center justify-center p-3">
            <p className="text-white">{getErrorMessage(error)}</p>
        </div>
    );
};

export default ServerError;