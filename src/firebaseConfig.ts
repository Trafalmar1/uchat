const {
  REACT_APP_API_KEY,
  REACT_APP_TEST_API_KEY,
  NODE_ENV: node,
} = process.env;

const isDev = node === "development";

const prodConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: "uchat-e9e68.firebaseapp.com",
  projectId: "uchat-e9e68",
  storageBucket: "uchat-e9e68.appspot.com",
  messagingSenderId: "415955918693",
  appId: "1:415955918693:web:5782e11d1cfb4589d80b8c",
  measurementId: "G-XDNB54N581",
};

const testConfig = {
  apiKey: REACT_APP_TEST_API_KEY,
  authDomain: "uchattest-23c65.firebaseapp.com",
  projectId: "uchattest-23c65",
  storageBucket: "uchattest-23c65.appspot.com",
  messagingSenderId: "710776887524",
  appId: "1:710776887524:web:025f904abbc6f0a21e34f1",
  measurementId: "G-13XQ5YQWMG",
};

export const firebaseConfig = isDev ? testConfig : prodConfig;
