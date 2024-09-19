
### Sin autenticación

1. Página de inicio y navegación principal:

```mermaid
stateDiagram-v2
    [*] --> LandingPage
    LandingPage --> Login : Iniciar sesión
    LandingPage --> Register : Registrarse
    LandingPage --> QuickDonation : Donación rápida
    Login --> RedirectToDashboard
    Register --> RedirectToLogin
    QuickDonation --> ReturnToLandingPage
    RedirectToDashboard --> [*]
    RedirectToLogin --> [*]
    ReturnToLandingPage --> [*]
```

2. Proceso de registro:

```mermaid
stateDiagram-v2
    [*] --> Register
    Register --> FillRegistrationForm
    FillRegistrationForm --> ValidateForm
    state ValidateForm <<choice>>
    ValidateForm --> RegistrationSuccess : Datos válidos
    ValidateForm --> FillRegistrationForm : Datos inválidos
    RegistrationSuccess --> SendConfirmationEmail
    SendConfirmationEmail --> RedirectToLogin
    RedirectToLogin --> [*]
```

3. Donación rápida:

```mermaid
stateDiagram-v2
    [*] --> QuickDonation
    QuickDonation --> EnterEmailAddress
    EnterEmailAddress --> SelectProject
    SelectProject --> EnterDonationAmount
    EnterDonationAmount --> ProcessPayment
    ProcessPayment --> SendConfirmationEmail
    SendConfirmationEmail --> ReturnToLandingPage
    ReturnToLandingPage --> [*]
```

### Usuario

1. Proceso de login de usuario:

```mermaid
stateDiagram-v2
    [*] --> EnterCredentials
    EnterCredentials --> ValidateCredentials
    state ValidateCredentials <<choice>>
    ValidateCredentials --> UserDashboard : Credenciales correctas
    ValidateCredentials --> EnterCredentials : Credenciales incorrectas
    UserDashboard --> RedirectToDashboard
    RedirectToDashboard --> [*]
```

2. Dashboard de usuario:

```mermaid
stateDiagram-v2
    [*] --> UserDashboard
    UserDashboard --> UserProfile
    UserDashboard --> ProjectsSection
    UserDashboard --> DonationsSection
    UserProfile --> UserDashboard
    ProjectsSection --> UserDashboard
    DonationsSection --> UserDashboard
    UserDashboard --> Logout
    Logout --> [*]
```

3. Gestión de perfil de usuario:

```mermaid
stateDiagram-v2
    [*] --> UserProfile
    UserProfile --> ViewPersonalInfo
    UserProfile --> EditPersonalInfo
    EditPersonalInfo --> SaveChanges
    state SaveChanges <<choice>>
    SaveChanges --> UserProfile : Cambios guardados
    SaveChanges --> EditPersonalInfo : Error al guardar
    UserProfile --> ReturnToDashboard
    ReturnToDashboard --> [*]
```

4. Sección de proyectos:

```mermaid
stateDiagram-v2
    [*] --> ProjectsSection
    ProjectsSection --> ListProjects
    ListProjects --> FilterProjects
    ListProjects --> SearchProjects
    ListProjects --> ViewProjectDetails
    ViewProjectDetails --> DonateToProject
    DonateToProject --> ConfirmDonation
    ConfirmDonation --> ReturnToProjects
    ReturnToProjects --> [*]
```

5. Sección de donaciones:

```mermaid
stateDiagram-v2
    [*] --> DonationsSection
    DonationsSection --> ListDonations
    DonationsSection --> CreateNewDonation
    DonationsSection --> ManageRecurringDonations
    ListDonations --> ViewDonationDetails
    CreateNewDonation --> SelectProject
    SelectProject --> EnterDonationAmount
    EnterDonationAmount --> ConfirmDonation
    ManageRecurringDonations --> UpdateDonationPreferences
    ConfirmDonation --> ReturnToDonations
    UpdateDonationPreferences --> ReturnToDonations
    ReturnToDonations --> [*]
```

### Administrador

1. Proceso de login de administrador:

```mermaid
stateDiagram-v2
    [*] --> EnterAdminCredentials
    EnterAdminCredentials --> ValidateAdminCredentials
    state ValidateAdminCredentials <<choice>>
    ValidateAdminCredentials --> AdminDashboard : Credenciales correctas
    ValidateAdminCredentials --> EnterAdminCredentials : Credenciales incorrectas
    AdminDashboard --> RedirectToAdminDashboard
    RedirectToAdminDashboard --> [*]
```

2. Dashboard de administrador:

```mermaid
stateDiagram-v2
    [*] --> AdminDashboard
    AdminDashboard --> UserManagement
    AdminDashboard --> ProjectManagement
    AdminDashboard --> DonationManagement
    AdminDashboard --> ReportGeneration
    UserManagement --> AdminDashboard
    ProjectManagement --> AdminDashboard
    DonationManagement --> AdminDashboard
    ReportGeneration --> AdminDashboard
    AdminDashboard --> AdminLogout
    AdminLogout --> [*]
```

3. Gestión de usuarios:

```mermaid
stateDiagram-v2
    [*] --> UserManagement
    UserManagement --> ListUsers
    UserManagement --> CreateUser
    UserManagement --> EditUser
    UserManagement --> DeleteUser
    CreateUser --> SaveNewUser
    EditUser --> SaveUserChanges
    DeleteUser --> ConfirmUserDeletion
    SaveNewUser --> ReturnToUserManagement
    SaveUserChanges --> ReturnToUserManagement
    ConfirmUserDeletion --> ReturnToUserManagement
    ReturnToUserManagement --> [*]
```

4. Gestión de proyectos:

```mermaid
stateDiagram-v2
    [*] --> ProjectManagement
    ProjectManagement --> ListProjects
    ProjectManagement --> CreateProject
    ProjectManagement --> EditProject
    ProjectManagement --> DeleteProject
    CreateProject --> SaveNewProject
    EditProject --> SaveProjectChanges
    DeleteProject --> ConfirmProjectDeletion
    SaveNewProject --> ReturnToProjectManagement
    SaveProjectChanges --> ReturnToProjectManagement
    ConfirmProjectDeletion --> ReturnToProjectManagement
    ReturnToProjectManagement --> [*]
```

5. Gestión de donaciones:

```mermaid
stateDiagram-v2
    [*] --> DonationManagement
    DonationManagement --> ListDonations
    DonationManagement --> ViewDonationDetails
    DonationManagement --> UpdateDonationStatus
    UpdateDonationStatus --> SaveStatusChanges
    ViewDonationDetails --> ReturnToDonationManagement
    SaveStatusChanges --> ReturnToDonationManagement
    ReturnToDonationManagement --> [*]
```

6. Generación de reportes:

```mermaid
stateDiagram-v2
    [*] --> ReportGeneration
    ReportGeneration --> GenerateDonationReport
    ReportGeneration --> GenerateProjectReport
    ReportGeneration --> ViewStatistics
    GenerateDonationReport --> DownloadReport
    GenerateProjectReport --> DownloadReport
    ViewStatistics --> ExportStatistics
    DownloadReport --> ReturnToReportGeneration
    ExportStatistics --> ReturnToReportGeneration
    ReturnToReportGeneration --> [*]
```
