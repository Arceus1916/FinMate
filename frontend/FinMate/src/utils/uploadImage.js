import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData(); // fixed typo: fromData → formData
  formData.append('image', imageFile); // fixed typo in variable name

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // fixed typo: reponse → response
  } catch (error) {
    console.error('Error uploading the image: ', error);
    throw error;
  }
};

export default uploadImage;
