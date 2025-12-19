/**
 * Utility functions for Todo App
 */

// 1. Function Declaration
export function saveData(key, data) {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
        return true;
    } catch (error) {
        console.error("Error saving data:", error);
        return false;
    }
}

// 2. Function Expression 
export const loadData = function(key) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const data = localStorage.getItem(key);
                if (data) {
                    resolve(JSON.parse(data));
                } else {
                    resolve(null);
                }
            } catch (error) {
                reject(new Error(`Failed to load data for key: ${key}`));
            }
        }, 500); 
    });
};
