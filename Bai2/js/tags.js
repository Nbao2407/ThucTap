export const DEFAULT_TAGS = [
    { name: 'Công việc', type: 'work', color: '#1864ab', bg: '#d0ebff' },  // Blue-700 on Blue-100
    { name: 'Cá nhân', type: 'personal', color: '#2b8a3e', bg: '#d3f9d8' }, // Green-700 on Green-100
    { name: 'Khẩn cấp', type: 'urgent', color: '#c92a2a', bg: '#ffe3e3' }   // Red-700 on Red-100
];

export const AVAILABLE_COLORS = [
    { name: 'red', hex: '#c92a2a', bg: '#ffe3e3' },
    { name: 'orange', hex: '#e8590c', bg: '#ffe8cc' },
    { name: 'yellow', hex: '#e67700', bg: '#fff3bf' },
    { name: 'green', hex: '#2b8a3e', bg: '#d3f9d8' },
    { name: 'blue', hex: '#1864ab', bg: '#d0ebff' },
    { name: 'purple', hex: '#5f3dc4', bg: '#e5dbff' },
    { name: 'pink', hex: '#a61e4d', bg: '#ffdeeb' },
    { name: 'gray', hex: '#495057', bg: '#e9ecef' }
];

export const getTagColors = (tags, tagName) => {
    const tag = tags.find(t => t.name === tagName);
    return tag ? { color: tag.color, bg: tag.bg } : { color: '#868e96', bg: '#f8f9fa' };
};
