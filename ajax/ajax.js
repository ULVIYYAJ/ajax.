$(document).ready(function () {
var basLink="https://jsonplaceholder.typicode.com";


    //Get Users
    $.ajax({
        url: basLink+"/users",
        type: "get",
        dataType: "json",
        success: function (response) {
            var users = document.getElementById('users');

            for (var i = 0; i < response.length; i++) {
                var tr = $('<tr/>');
                var mainbutton = $('<button/>');
                var secondbutton = $('<button/>');
                


                var td_id = $('<td/>');
                var td_name = $('<td/>');
                var td_username = $('<td/>');
                var td_email = $('<td/>');
                var td_phone = $('<td/>');
                var td_website = $('<td/>');
                var td_dbt_information = $('<td/>');
                var btn = $('<td/>');

                var id = response[i].id;
                var name = response[i].name;
                var username = response[i].username;
                var email = response[i].email;
                var phone = response[i].phone;
                var website = response[i].website;

                $(td_id).append(id);
                $(td_name).append(name);
                $(td_username).append(username);
                $(td_email).append(email);
                $(td_phone).append(phone);
                $(td_website).append(website);

                $(tr).append(td_id);
                $(tr).append(td_name);
                $(tr).append(td_username);
                $(tr).append(td_email);
                $(tr).append(td_phone);
                $(tr).append(td_website);
                $(tr).append(mainbutton);
                $(btn).append(secondbutton);
                $(td_dbt_information).append(mainbutton);
                $(tr).append(td_dbt_information);
                $(tr).append(btn);
                $(mainbutton).addClass("btn btn-outline-info detailbtn");
                $(mainbutton).text("Details");

                $(secondbutton).addClass("btn btn btn-primary morebtn");
                $(secondbutton).text("More");
                // $(mainbutton).css('margin-top', '1px');
                $(mainbutton).css('margin-left', '20px');
                $(users).append(tr);

                //Set attributes for modal
                $(mainbutton).attr("data-toggle", "modal");
                $(mainbutton).attr("data-target", "#exampleModal");

                $(secondbutton).attr("data-toggle", "modal");
                $(secondbutton).attr("data-target", "#example");

                //Set attribute for find row
                $(mainbutton).attr("data-id", id);
                $(tr).attr("data-id", id);
                $(secondbutton).attr("data-id", id);
                $(tr).attr("data-id", id);
            }
        },
        error: function (error) {
            console.log(error);
        },
        always: function () { }
    })


    $(document).on("click", '.detailbtn', function () {
        //Get id of button which we click
        var id = $(this).attr("data-id");

        //find tr with same id of button
        var row = $('tr[data-id="' + id + '"]');

        //find all td of tr and find username td in tr
        $(row).find('td').each(function (index) {
            if (index == 1) {
                $("h5").text($(this).text());
            }
        });
    });



    $(document).on("click", '.detailbtn', function () {
        var id = $(this).attr("data-id")

        $.ajax({
            url: basLink+"/users/" + id,
            type: "get",
            dataType: "json",
            success: function (response) {
                $('.inner').css('margin-bottom', '30px')
                $('.inner1').text(response.address.street);
                $('.inner2').html(response.address.suite);
                $('.inner3').html(response.address.city);
                $('.inner4').html(response.address.zipcode);
                $('.inner5').html(response.address.geo.lat);
                $('.inner6').html(response.address.geo.lng);
                $('.inner7').html(response.company.name);
                $('.inner8').html(response.company.catchPhrase);
                $('.inner9').html(response.company.bs);
            },
            error: function (error) {
                console.log(error);
            },
            always: function () { }
        })

    });

    $(document).on("click", '.morebtn', function () {
        var id = $(this).attr("data-id")

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/users/" + id + "/todos",
            type: "get",
            dataType: "json",
            success: function (response) {
                var usermore = document.getElementById('usermore');
                $(usermore).empty()
                for (var i = 0; i < 5; i++) {
                    var tr = $('<tr/>');
                    var td_id2 = $('<td/>');
                    var td_title = $('<td/>');
                    var td_completed = $('<td/>');
                    var deletebutton = $('<button/>');
                    var td_delete = $('<td/>');


                    var id = response[i].id;
                    var title = response[i].title;
                    var completed = response[i].completed;

                    $(td_id2).append(id);
                    $(td_title).append(title);
                    $(td_completed).append(completed);

                    $(tr).append(td_id2);
                    $(tr).append(td_title);
                    $(tr).append(td_completed);
                    $(tr).append(td_delete);
                    $(deletebutton).addClass("btn btn btn-primary deletebtn");
                    $(deletebutton).text("Delete");


                    $(usermore).append(tr);

                    if (completed == true) {
                        $(td_completed).text("icra olundu");
                        $(td_delete).append(deletebutton);
                        $(document).on("click", ".deletebtn", function () {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!',

                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                    )
                                    $(".deletebtn").closest("tr").remove();
                                }
                            })
                        });
                    }
                    else {
                        $(td_completed).text("icradadi");
                    }
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    })
})
