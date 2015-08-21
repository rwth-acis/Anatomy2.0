# Documentation of the current registration implementation
Anatomy2.0 distinguishes between two types of accounts: student accounts and lecturer accounts (sometimes called tutor accounts). Independently of whether an account is for students or lecturers, an account is always based on a Learning Layers account. This means, every user can use his Learning Layers account to authenticate with at Anatomy2.0.  
By default, every account is considered a student account. A lecturer needs to specifically upgrade his/her account to a lecturer account. The option to upgrade an account will be provided when trying to create a course or upload a model.  
Technically, the input form for upgrading an account is handled in `not_authorized.php`. The handler for clicking the upgrade button can be found in `upgrade-account.js`. `onRequestLecturerClick()` will send a `POST` request to `php/register_as_tutor.php` and provide all user inputs as parameters. `register_as_tutor.php` then uses `php/confirm_registration.php` to update the database entries and send emails to inform the user and all Anatomy2.0 admins about the successful registration.

# Registration User Story - View: Lecturer
- As a lecturer, I want to be able to upgrade my account to unlock the features "create/updatate/delete course", "upload model" and "lecturers mode".
- As a lecturer, I want the upgrade to be very fast (should take less than a minute).
- As a lecturer, I want to use my Learning Layers account with our system.
- As a lecturer, I want the system to derive my email address and user name automatically.
- As a lecturer, I want to be informed by mail when the account creation is really finished, such that I know that I can start using my lecturers account.

# Registration User Story - View: Administrator
- As an administrator, I want to be able to register my email address to the 3D Models system, such that I can be informed when someone upgrades a Anatomy2.0 account to the lecturer version.
- As an administrator, I want to be informed by mail when someone upgrades an account to the lecturer version, such that I can evaluate who has access to the lecturer features.

# Registration User Story - View: Student
- As a student, I do not want to be forced to create an account for using the 3D Models system. (At the moment there are no features for students that require identification or use personalization / customization.)
- As a student, I want to be able to use a Learning Layers account for synchronization of models in a course room (ROLE space).
