type FlattenedObject = {
    [key: string]: string | number | boolean | null | undefined;
};

export const flattenObject = (obj: Record<string, any>, prefix = ''): FlattenedObject => {
    let flattened: FlattenedObject = {};

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // Replace "_id" with "id" in the key
            let prefixedKey = prefix ? `${prefix}.${key === '_id' ? 'id' : key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                // Recursively flatten nested objects
                Object.assign(flattened, flattenObject(obj[key], prefixedKey));
            } else {
                flattened[prefixedKey === '_id' ? 'id' : prefixedKey] = obj[key];
            }
        }
    }

    return flattened;
};

