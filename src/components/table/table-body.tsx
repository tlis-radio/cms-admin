type TableBodyProps = {
    data: Array<Array<number | string | React.ReactNode>>;
};

const TableBody: React.FC<TableBodyProps> = ({ data }) => {

    const renderRow = (row: Array<number | string | React.ReactNode>, index: number) => {
        return (
            <tr className="border-b" key={index}>
                {row.map((cell, index) => (
                    <td key={index} className="whitespace-nowrap px-6 py-4 font-medium">{cell}</td>
                ))}
            </tr>
        )
    };

    return (
        <tbody>
            {data.map((row, index) => renderRow(row, index))}
        </tbody>
    )
};

export default TableBody;