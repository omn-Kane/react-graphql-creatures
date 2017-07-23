// dynamicSort from https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
export function dynamicSort(property, desc = false) {
    var sortOrder = 1;
    if (desc) {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
