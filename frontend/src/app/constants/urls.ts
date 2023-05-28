const BASE_URL: string = "http://localhost:8000/api/main-app";

interface IUrls {
  readonly UPLOAD_VIDEO: () => string;
}

const URLS: IUrls = {
  UPLOAD_VIDEO: () => `${BASE_URL}/upload-video`,
};

export default URLS;
