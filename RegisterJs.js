
        // Load Data in Table when document is ready
        $(document).ready(function() {
            loadData();
        });
    
    // Load Data function
    function loadData() {
        $.ajax({
            url: "/Home/List",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.MobileNum + '</td>';
                    html += '<td>' + item.EmailId + '</td>';
                    html += '<td>' + item.Name + '</td>';
                    html += '<td><a href="#" onclick="return getbyID(' + item.MobileNum + ')">Edit</a> | <a href="#" onclick="Delele(' + item.EmailId + ')">Delete</a></td>';
                    html += '</tr>';
                });
                $('.tbody').html(html);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

    // Add Data Function
function Create() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        MobileNum: $('#MobileNum').val(),
        EmailId: $('#EmailId').val(),
        Name: $('#Name').val()
    };
    $.ajax({
        url: "/Home/Create",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


    // Function for getting the Data Based upon Employee ID
function Details(EmpID) {
    $('#MobileNum').css('border-color', 'lightgrey');
    $('#EmailId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Home/Details/" + EmpID, // Use EmpID instead of MobileNum here
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#MobileNum').val(result.MobileNum);
            $('#EmailId').val(result.EmailId);
            $('#Name').val(result.Name);

            // Disable MobileNum field after setting value
            $('#MobileNum').prop('disabled', true);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}


    // Function for updating employee's record
    function Update() {
        var res = validate();
        if (res == false) {
            return false;
        }
        var empObj = {
            MobileNum: $('#MobileNum').val(),
            EmailId: $('#EmailId').val(),
            Name: $('#Name').val()
        };
        $.ajax({
            url: "/Home/Update",
            data: JSON.stringify(empObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadData();
                $('#myModal').modal('hide');
                $('#MobileNum').val("");
                $('#EmailId').val("");
                $('#Name').val("");
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

    // Function for deleting employee's record
    function Delete(id) {
        var ans = confirm("Are you sure you want to delete this Record?");
        if (ans) {
            $.ajax({
                url: "/Home/Delete/" + id,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadData();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    }

    // Function for clearing the textboxes
function clearTextBox() {
    $('#MobileNum').val("").prop('disabled', false); // Enable for new entry
    $('#EmailId').val("");
    $('#Name').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#MobileNum').css('border-color', 'lightgrey');
    $('#EmailId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;

    if (!$('#MobileNum').prop('disabled') && $('#MobileNum').val().trim() === "") {
        $('#MobileNum').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#MobileNum').css('border-color', 'lightgrey');
    }

    if ($('#EmailId').val().trim() === "") {
        $('#EmailId').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#EmailId').css('border-color', 'lightgrey');
    }

    if ($('#Name').val().trim() === "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#Name').css('border-color', 'lightgrey');
    }

    return isValid;
}






