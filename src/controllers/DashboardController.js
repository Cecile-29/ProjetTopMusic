class DashboardController {
    index(request, response) {
        response.render('admin/dashboard/index');
    }   
}

module.exports = new DashboardController();