export function svgToDataUrl(svgTag, base64 = true) {
    var string = new XMLSerializer().serializeToString(svgTag)
    if (base64) {
        var encodedData = window.btoa(string)
        return `data:image/svg+xml;base64,${encodedData}`
    } else {
        return `data:image/svg+xml;${encodeURIComponent(string)}`;
    }
}

export async function svgToPNGDataUrl(svgTag) {
    return new Promise(res => {
        var image = new Image();
        image.onload = () => res(imageToDataUrl(image));
        image.src = svgToDataUrl(svgTag);
    })

}

export function imageToDataUrl(imgTag) {
    var canvas = document.createElement('canvas');
    canvas.getContext('2d').drawImage(imgTag, 0, 0);
    return canvas.toDataURL();

}

export function splitUrl(string, delKv = '=', delPairs = '&') {
    string = string ?? decodeURIComponent(location.search.slice(1));
    const entries = string.split(delPairs).map(pairs => pairs.split(delKv));
    return Object.fromEntries(entries);
}