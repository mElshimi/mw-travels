export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500 ;
  if(process.env.MODE =='DEV'){
    res.status(err.statusCode).json({ error: err.message });
}else{
    res.status(err.statusCode).json({ error: err.message });
    
}
};
