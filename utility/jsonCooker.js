exports.successMany = (data) => {
    return {
        message: 'ok',
        total: data.length,
        data,
    };
};

exports.success = (data) => {
    return {
        message: 'ok',
        total: 1,
        data: [data],
    };
};

exports.fail = (message) => {
    return {
        message,
    };
};

exports.error = (message) => {
    return {
        message,
    };
};
