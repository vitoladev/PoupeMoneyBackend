import app from './app';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
