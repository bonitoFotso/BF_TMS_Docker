// actions.js (ou le nom de votre fichier d'actions)

// action types
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

// action creators
export const updateProfile = (formData) => {
    return {
        type: UPDATE_PROFILE,
        payload: formData,
    };
};
