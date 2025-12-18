export const DEFAULT_TAGS = [
    { name: 'Công việc', type: 'work', color: '#228be6', bg: '#e7f5ff' },
    { name: 'Cá nhân', type: 'personal', color: '#40c057', bg: '#ebfbee' },
    { name: 'Khẩn cấp', type: 'urgent', color: '#fa5252', bg: '#fff5f5' }
];

export const AVAILABLE_COLORS = [
    { name: 'red', hex: '#fa5252', bg: '#fff5f5' },
    { name: 'orange', hex: '#fd7e14', bg: '#fff4e6' },
    { name: 'yellow', hex: '#fab005', bg: '#fff9db' },
    { name: 'green', hex: '#40c057', bg: '#ebfbee' },
    { name: 'blue', hex: '#228be6', bg: '#e7f5ff' },
    { name: 'purple', hex: '#7950f2', bg: '#f3f0ff' },
    { name: 'pink', hex: '#be4bdb', bg: '#fcc2d7' },
    { name: 'gray', hex: '#868e96', bg: '#f8f9fa' }
];

export const getTagColors = (tags, tagName) => {
    const tag = tags.find(t => t.name === tagName);
    return tag ? { color: tag.color, bg: tag.bg } : { color: '#868e96', bg: '#f8f9fa' };
};
