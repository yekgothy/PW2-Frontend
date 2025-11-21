import app from './app.js';

const port = Number(process.env.PORT) || 4010;

app.listen(port, () => {
  console.log(`PW2-Frontend backend running on port ${port}`);
});
