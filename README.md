### Atlas Security Administrator Web Site
#### Purpose 

Most of the Azure B2C user administration can only be done through API. We are looking to build a Web App in AWS using Python (maybe with Django framework) to manage the Azure B2C users through Graph API.

#### Requirements

1. Audit trail – any action by the UNDP security administrator performed on the website needs to be logged.
2. SSO – UNDP security administrators should authenticate into the application with their UNDP Azure credential.

#### Application functions

1. Allow security administrators to search the Atlas users in B2C by name or email address (complete or partial) and display the user information.
2. Allow security administrators to search the atlas user and reset its password. It should give the security administrator the option to send an email with the password directly to the user.
3. Allow security administrators to enable or disable the Azure B2C user. This operation will need to support the batch function to allow the security administrator to paste the list of the name into the box and process the list of the users.

---

### API Middleware

#### Purpose 

API endpoints are required for the Just In Time User (JIT) migration from Atlas LDAP into Azure B2C and future new user provisioning from Atlas. We are looking to build the app on Prem in Atlas environment using Python (maybe with Flask framework).

#### Requirements

1. Logging – all web calls received and returned should be recorded for the troubleshooting and monitoring purpose.

#### Application functions

1. JIT Migration User Endpoint
API receives a web call with username and password.
    - API validates with LDAP whether the username and password can bind.
    - If the credential is validated, API should retrieve LDAP user attributes and call MS Graph to create Azure B2C user with those attributes. Then return success status code.
    - If the credential is not validated, API returns a failed status code.
2. User Creation Endpoint
    - API receives web all with username, password and some other some user information.
    - API should call MS Graph to create the user with those attributes.
3. User Deactivation Endpoint
    - API receive web call with username and status=deactivated
    - API should call MS graph and set the B2C user to deactivated

---

### Logon Page

#### Purpose

Azure B2C standard logon page mainly support its default user flow which is Oauth driven with both Sign-in and Sign-up functions. In UNDP design, the standard user flow cannot be used.  Azure B2C does not offer much flexibility to customize the login page. Microsoft recommendation is to host a custom login page that allows editing CSS to change the look and feel of the page.

---

### Profile Edit Page

#### Purpose

Azure B2C only supports SP initiated login. Profile edit feature usually is a feature for the IDP initiated. In order to allow the user to edit their password self-service email address, a separate web app need to be hosted externally.