import TableBody from "./table-body";
import TableHead from "./table-head";

type TableProps = {
    className?: string;
    headings: string[];
    data: Array<Array<number | string>>;
};

const Table: React.FC<TableProps> = ({ headings, data, className }) => {
    return (
        <table className={`min-w-full text-left text-sm font-light ${className}`}>
            <TableHead headings={headings} />
            <TableBody data={data} />
        </table>
    );
};

export default Table;