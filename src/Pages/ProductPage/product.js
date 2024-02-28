import axios from "axios";



export const getAllProduct = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`https://du-an-tot-nghiep-be-1.vercel.app/products`);
        dispatch({ type: "GET_ALL_PRODUCT", payload: data });
    } catch (error) {
        dispatch({ type: "GET_ALL_PRODUCT_FAIL", payload: error.message });
    }
};
export const getproductById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            `https://du-an-tot-nghiep-be-1.vercel.app/products/${id}`
        );
        dispatch({ type: "GET_PRODUCT_BY_ID", payload: data });
    } catch (error) {
        dispatch({ type: "GET_PRODUCT_BY_ID_FAIL", payload: error.message });
    }
};