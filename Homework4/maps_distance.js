const getDistance = (pointA, pointB, cb) => {
    const key = 'nJo761_9oG3RXlWF_hnqMJ4PRSYKD9aAjk8j6ryBIi0';
    const link = 'https://atlas.microsoft.com/route/directions/json?subscription-key=' + key + '&api-version=1.0&query='
        + pointA.x + ',' + pointA.y + ':' + pointB.x + ',' + pointB.y;
    fetch(link).then(
        data => data.json()
    ).then(res => {
        cb(res['routes'][0]['summary']['lengthInMeters'] / 1000);
    });
};