const express = require('express');
const app = express();

const port = process.env.PORT;

app.listen(port,()=>{
  console.log('server are listen on port 3000')
});
