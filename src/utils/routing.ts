export const getParentFolder = (pathname: string) => {
    const parts = pathname.split('/');
    parts.pop();
    return parts.join('/');
};