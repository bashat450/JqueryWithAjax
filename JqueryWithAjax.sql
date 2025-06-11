Create database JqueryWithAjax;
Use JqueryWithAjax;
CREATE TABLE Register (
    MobileNum INT PRIMARY KEY,
    EmailId NVARCHAR(200),
    Name NVARCHAR(100)
);

CREATE PROCEDURE SP_ManageRegister
    @Action NVARCHAR(10),
    @MobileNum INT = NULL,
    @EmailId NVARCHAR(200) = NULL,
    @Name NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @Action = 'INSERT'
    BEGIN
        INSERT INTO Register (MobileNum, EmailId, Name)
        VALUES (@MobileNum, @EmailId, @Name);
    END

    ELSE IF @Action = 'UPDATE'
    BEGIN
        UPDATE Register
        SET EmailId = @EmailId,
            Name = @Name
        WHERE MobileNum = @MobileNum;
    END

    ELSE IF @Action = 'DELETE'
    BEGIN
        DELETE FROM Register
        WHERE MobileNum = @MobileNum;
    END

    ELSE IF @Action = 'GET'
    BEGIN
        IF @MobileNum IS NULL
        BEGIN
            SELECT * FROM Register; -- Get all
        END
        ELSE
        BEGIN
            SELECT * FROM Register WHERE MobileNum = @MobileNum; -- Get by ID
        END
    END
END;

EXEC SP_ManageRegister 
    @Action = 'INSERT',
    @MobileNum = 1234567890,
    @EmailId = 'bashat@gmail.com',
    @Name = 'Bashat Parween';

EXEC SP_ManageRegister 
    @Action = 'UPDATE',
    @MobileNum = 1234567890,
    @EmailId = 'neha@gmail.com',
    @Name = 'Neha Updated';	

EXEC SP_ManageRegister 
    @Action = 'DELETE',
    @MobileNum = 1234567890;

EXEC SP_ManageRegister 
    @Action = 'GET';

EXEC SP_ManageRegister 
    @Action = 'GET',
    @MobileNum = 1234567890;
