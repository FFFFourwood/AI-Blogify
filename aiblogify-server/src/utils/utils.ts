export const extractImageUrls = (markdown: string): string[] => {
    const regex = /!\[.*?\]\((.*?)\)/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(markdown)) !== null) {
        matches.push(match[1]);
    }
    return matches;
};
