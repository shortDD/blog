/// <reference types="react-scripts" />
declare module "react/jsx-runtime" {
  export default any;
}

interface Window {
  $modal: any;
}
