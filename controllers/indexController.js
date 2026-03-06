exports.getHomePage = (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to your Node.js Backend!' });
};
