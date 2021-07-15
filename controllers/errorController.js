exports.getErrorPage = (request,response,next) => {
    response.status(404).render('404',{docTitle: 'error',path: ''});
};