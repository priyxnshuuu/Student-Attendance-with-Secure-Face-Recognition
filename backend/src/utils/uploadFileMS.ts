import FormData from "form-data";
const fs = require("fs");
import axios from "axios";

import { Config } from "../config/Config";

export const uploadFileMS = async (file: Express.Multer.File) => {
  try {
    const config = new Config();

    const formData = new FormData();
    formData.append("file", file.buffer, file.originalname);
    const headers = {
      Authorization: `Bearer ${config.environmentVariable.uploadApiKey}`,
      "Content-Type": "multipart/form-data",
    };

    const response = await axios({
      url: `https://bucket.meerasolution.com/upload-file?bucketName=${config.environmentVariable.msBucketName}`,
      method: "POST",
      data: formData,
      headers: headers,
    });

    if (response.status === 201) {
      return response.data.data;
    } else {
      throw new Error(response.data.data.message);
    }
  } catch (error: any) {
    throw new Error(error.data);
  }
};
