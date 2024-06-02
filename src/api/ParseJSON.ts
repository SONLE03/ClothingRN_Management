export const ParseJSON = (value: string) => {
    if (!value) {
        throw new Error('No access token found');
    }

    const parseToken = JSON.parse(value);
    return parseToken;
}