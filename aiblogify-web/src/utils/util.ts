export const stripMarkdown = (mdText: string) => {
    // Remove Markdown links
    let strippedText = mdText.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    // Remove HTML tags
    strippedText = strippedText.replace(/<\/?[^>]+(>|$)/g, '');

    // Remove remaining Markdown formatting characters
    strippedText = strippedText.replace(/([#*_~`>])/g, '');

    // Normalize line breaks and whitespace
    strippedText = strippedText.replace(/\s+/g, ' ').trim();

    return strippedText;
}