const corsConfig = () => {
  return {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  };
};

export default corsConfig;
