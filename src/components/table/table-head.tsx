type TableHeadProps = {
    headings: string[];
}

const TableHead: React.FC<TableHeadProps> = ({ headings }) => {
    return (
        <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
                {headings.map((heading, index) => (
                    <th key={index} scope="col" className="px-6 py-4">{heading}</th>
                ))}
            </tr>
        </thead>
    )
};

export default TableHead;