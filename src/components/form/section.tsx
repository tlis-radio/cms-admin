type SectionProps = {
    title: string;
};

const Section: React.FC<SectionProps & React.PropsWithChildren> = ({ title, children }) => {
    return (
        <div>
            <h1 className='font-bold border-b my-4'>{ title }</h1>
            <div>
                { children }
            </div>
        </div>
    );
};

export default Section;