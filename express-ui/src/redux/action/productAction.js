import Axios from 'axios';
import { api_url } from '../../favordb';
import {
  API_LOADING_START,
  API_LOADING_FAILED,
  API_LOADING_SUCCESS,
  API_GET_PRODUCTDB,
} from '../type';
import Swal from 'sweetalert2';

const productdb_url = `${api_url}/productdb`;

// cara 1
// export const getProductdbAction = () => {
//   return (dispatch) => {
//     dispatch({
//       type: API_LOADING_START,
//     });
//     Axios.get(productdb_url)
//       .then((response) => {
//         console.log('GET_productdb_getProductdb - SUCCESS');
//         dispatch({
//           type: API_LOADING_SUCCESS,
//         });
//         dispatch({
//           type: API_GET_PRODUCTDB,
//           payload: response.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         Swal.fire({
//           title: 'Ooppss...!!',
//           icon: 'error',
//           text: 'Something gonna wrong, please contact our CS!!',
//           timer: 3000,
//         });
//         dispatch({
//           type: API_LOADING_FAILED,
//           payload: error.message,
//         });
//       });
//   };
// };

//cara2
export const getProductdbAction = (isAvailable) => {
  return async (dispatch) => {
    // await
    dispatch({
      type: API_LOADING_START,
    });
    try {
      if (isAvailable) {
        const res = await Axios.get(`${productdb_url}?isAvailable=1`);
        dispatch({
          type: API_GET_PRODUCTDB,
          payload: res.data,
        });
      } else {
        const res = await Axios.get(productdb_url);
        dispatch({
          type: API_GET_PRODUCTDB,
          payload: res.data,
        });
      }
      dispatch({
        type: API_LOADING_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ooppss...!!',
        icon: 'error',
        text: `Something gonna wrong, please contact our CS!!\nmessage: ${error.message}`,
        // timer: 3000,
      });
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const deleteProductAction = (productID, productName) => {
  return (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    // delete to change isAvailable = 0
    // Axios.put(`${productdb_url}/${productID}`)
    // delete beneran
    Axios.delete(`${productdb_url}/${productID}`)
      .then((response) => {
        console.log('PUT_productdb_deleteProduct - SUCCESS');
        dispatch(getProductdbAction(true));
        dispatch({
          type: API_LOADING_SUCCESS,
        });
        Swal.fire('Deleted!', `${productName} has been deleted.`, 'success');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Ooppss...!!',
          icon: 'error',
          text: 'Something gonna wrong, please contact our CS!!',
          timer: 3000,
        });
        dispatch({
          type: API_LOADING_FAILED,
          payload: error.message,
        });
      });
  };
};

export const postProductAction = (newProduct) => {
  return async (dispatch) => {
    const { nama, harga, stock, caption, image } = newProduct;
    let formData = new FormData();

    // FORMDATA GA BISA APPEND OBJEK
    // JSON.stringify utk convert objek menjadi string panjang
    // JSON.parse untuk mengembalikan menjadi OBJEK

    // cara 1
    const value = JSON.stringify({ nama, caption, stock, harga });
    formData.append('image', image.imageFile);
    formData.append('data', value);

    // cara 2
    // formData.append('nama', nama);
    // formData.append('harga', harga);
    // formData.append('stock', stock);
    // formData.append('caption', caption);

    // formData.append('data', { nama, harga, stock, caption }); // error tidak bisa append object
    dispatch({
      type: API_LOADING_START,
    });
    try {
      console.log(image);
      console.log(formData);
      // Wajib pake header jika mengirim FormData !!
      const header = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      await Axios.post(productdb_url, formData, header);
      dispatch(getProductdbAction(true));
      dispatch({
        type: API_LOADING_SUCCESS,
      });
      Swal.fire({
        title: 'Product has been added',
        icon: 'success',
        timerProgressBar: true,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ooppss...!!',
        icon: 'error',
        text: `Something gonna wrong, please contact our CS!!\nmessage: ${error.message}`,
      });
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const editProductAction = (patchData) => {
  return async (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    const { id, nama, harga, caption, stock, image } = patchData;
    const value = JSON.stringify({ nama, harga, stock, caption, image });
    let formData = new FormData();
    formData.append('image', image.imageFile);
    formData.append('data', value);
    try {
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      await Axios.patch(`${productdb_url}/${id}`, formData, headers);
      Swal.fire({
        title: 'Successfully!! product edited',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
      });
      dispatch({
        type: API_LOADING_SUCCESS,
      });
      dispatch(getProductdbAction(true));
    } catch (error) {
      console.log(patchData);
      console.log(error);
      Swal.fire({
        title: 'Ooppss...!!',
        icon: 'error',
        text: `Something gonna wrong, please contact our CS!!\nmessage: ${error.message}`,
      });
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const getProductSelectedAction = (productSelected) => {
  return async (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    try {
      dispatch({
        type: 'GET_PRODUCT_SELECTED',
        payload: productSelected,
      });
      dispatch({
        type: API_LOADING_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ooppss...!!',
        icon: 'error',
        text: `Something gonna wrong, please contact our CS!!\nmessage:${error.message}`,
      });
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};

export const deleteProductSelectedAction = (null_data) => {
  return async (dispatch) => {
    dispatch({
      type: API_LOADING_START,
    });
    try {
      dispatch({
        type: 'DELETE_PRODUCT_SELECTED',
        payload: null_data,
      });
      dispatch({
        type: API_LOADING_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Ooppss...!!',
        icon: 'error',
        text: `Something gonna wrong, please contact our CS!!\nmessage:${error.message}`,
      });
      dispatch({
        type: API_LOADING_FAILED,
        payload: error.message,
      });
    }
  };
};
