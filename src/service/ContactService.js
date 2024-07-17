import api from "../configs/Axios"
import {API_CONSTANTS} from "../constants/Index"


export const getAllContacts = async () => {
    try {
        const response = await api.get(API_CONSTANTS.GET_ALL_CONTACTS);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const addNewContacts = async (contact) => {
    try {
        const response = await api.post(API_CONSTANTS.ADD_NEW_CONTACTS, contact);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const deleteContacts = async (id) => {
    try {
        const response = await api.delete(`${API_CONSTANTS.DELETE_CONTACTS}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const updateContacts = async (contactId, contactData) => {
    try {
        const url = `${API_CONSTANTS.UPDATE_CONTACTS}/${contactId}`;
        const response = await api.put(url, contactData);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getByIdContacts = async (id) => {
    try {
        const response = await api.get(`${API_CONSTANTS.GET_BY_ID_CONTACTS}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getAllCountry = async () => {
    try {
        const response = await api.get(API_CONSTANTS.GET_ALL_COUNTRY);
        return response.data;
    } catch (error) {
        return error;
    }
}





