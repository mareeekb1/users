const userReducer = (user = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.user;
        case "LOGOUt":
            return {};
        default:
            return user;
    }
};

export default userReducer;
