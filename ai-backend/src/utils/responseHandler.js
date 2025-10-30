const successResponse = (data = [], message = "Request successful") => {
    return {
        status: "success",
        message,
        data,
    };
};

const errorResponse = (message = "Something went wrong", errors = []) => {
    const response = {
        status: "error",
        message,
    };

    if (errors && errors.length > 0) {
        response.errors = errors;
    }

    return response;
};

module.exports = { successResponse, errorResponse };
