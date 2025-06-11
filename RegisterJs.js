// Load Data in Table when document is ready
$(document).ready(function () {
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
                html += '<td><a href="#" onclick="return Details(' + item.MobileNum + ')">Edit</a> | <a href="#" onclick="Delete(' + item.MobileNum + ')">Delete</a></td>';
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
        return false; // Stop execution if validation fails
    }

    var mobileNumVal = $('#MobileNum').val().trim();
    // Ensure mobileNum is a valid integer. If validation passed, it should be.
    var mobileNum = parseInt(mobileNumVal);

    var empObj = {
        MobileNum: mobileNum,
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
            if (result.success) {
                loadData();
                $('#myModal').modal('hide');
                clearTextBox();
            } else {
                alert(result.message); // Show error message from server if any
            }
        },
        error: function (errormessage) {
            alert("Error creating record: " + errormessage.responseText);
        }
    });
}



// Function for getting the Data Based upon Employee ID
function Details(EmpID) {
    $('#MobileNum').css('border-color', 'lightgrey');
    $('#EmailId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Home/Details/" + EmpID,
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
            alert("Error fetching details: " + errormessage.responseText);
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

    var mobileNumVal = $('#MobileNum').val().trim();
    var mobileNum = mobileNumVal ? parseInt(mobileNumVal) : 0; // Ensure it's a number, default to 0 if empty/invalid

    var empObj = {
        MobileNum: mobileNum, // MobileNum is disabled, but we ensure its value is a valid number
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
            if (result.success) {
                loadData();
                $('#myModal').modal('hide');
                clearTextBox();
            } else {
                alert(result.message); // Show error message from server if any
            }
        },
        error: function (errormessage) {
            alert("Error updating record: " + errormessage.responseText);
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
                if (result.success) {
                    loadData();
                } else {
                    alert(result.message); // Show error message from server if any
                }
            },
            error: function (errormessage) {
                alert("Error deleting record: " + errormessage.responseText);
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

// Your validate function is good, just ensure its return value is respected by Create()
function validate() {
    var isValid = true;

    // Only validate MobileNum if it's not disabled (i.e., for Create operations)
    var mobileNumInput = $('#MobileNum');
    if (!mobileNumInput.prop('disabled')) { // For Create
        var mobileNumVal = mobileNumInput.val().trim();
        if (mobileNumVal === "") {
            mobileNumInput.css('border-color', 'Red');
            isValid = false;
        } else if (isNaN(parseInt(mobileNumVal)) || !/^\d+$/.test(mobileNumVal)) { // Check if it's a valid integer
            mobileNumInput.css('border-color', 'Red');
            alert("Mobile Number must be a valid number.");
            isValid = false;
        } else {
            mobileNumInput.css('border-color', 'lightgrey');
        }
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
