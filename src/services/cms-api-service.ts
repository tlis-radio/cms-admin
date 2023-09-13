class CmsApiService
{
    public static async PostAsync(uri: string, body: any) : Promise<void>
    {
        const response = await fetch(
            uri,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

        await response;
    }

    public static async GetAsync<T>(uri: string) : Promise<T>
    {
        const response = await fetch(uri);

        return response.json();
    }
}

export default CmsApiService;