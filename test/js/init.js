
    $(function () {

        $('.sidenav')
        .sidenav()
        .on('click tap', 'li a', () => {
            $('.sidenav').sidenav('close');
        });

    }); // end of document ready


