function getImgUrl(name) {
    if (!name) {
        return new URL('../assets/books/default-cover.jpg', import.meta.url).href; // Fallback image
    }

    // If it's an external URL, return as is
    if (name.startsWith('http') || name.startsWith('https')) {
        return name;
    }

    // Otherwise, assume it's a local asset
    return new URL(`../assets/books/${name}`, import.meta.url).href;
}

export { getImgUrl };
